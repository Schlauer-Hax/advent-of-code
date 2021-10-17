import express from 'express';
import expressWs from 'express-ws';
const { app, getWss, applyTo } = expressWs(express());

import Websocket from 'ws';

const url = 'ws://127.0.0.1:8182';
let sws = new Websocket(url);
sws.on('open', () => {
  sws.send('aocwebserver:connected')
})

let solutions: string[] = []

sws.on('message', (data) => {
  const string = String(data);
  if (string.startsWith('aocserver:solutions')) {
    const split = string.split(':');
    split.shift()
    split.shift()
    split.forEach(solutionclient => {
      solutions = solutions.filter(solution => solution.split(',')[0]!==solutionclient.split(',')[0])
      solutions.push(solutionclient);
    })
  }
})

sws.on('error', reconnect)
sws.on('close', reconnect)
function reconnect() {
  setTimeout(() => {
    sws = new Websocket(url);
  }, 5000)
}


app.get('/', function (req, res, next) {
  console.log('get route');
  res.end();
});

app.ws('/', function (ws, req) {
  ws.on('message', function (msg) {
    console.log(msg);
    const split = msg.toString().split(':');
    if (split[0] !== 'aocwebsite') return;

    const command = split[1];
    if (command === 'connected') {
      ws.send('aocwebserver:solutions:'+solutions.join(':'));
    } else if (command === 'run') {
      
    }
  });
  ws.on('close', () => {
    console.log('closed')
  })
});

app.listen(9000);