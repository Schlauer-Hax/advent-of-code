import { WebSocketServer, WebSocket } from 'ws';
import * as fs from "fs";
import { v4 } from 'uuid';

const wss = new WebSocketServer({ port: 8182 });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    handleMessage(String(message), ws);
  });

  ws.send('aocserver:connected');
});

let clients: [string, WebSocket][] = [];

let runs: [string, string][] = []

function handleMessage(message: string, websocket: WebSocket) {
  const split = message.split(':');
  if (split[0] !== 'aocclient') return
  const clientname = split[1];
  const messagedata = split[2];

  if (messagedata === 'connected') {
    console.log(`${clientname} connected!`)
    if (clients.filter(client => client[0] === clientname).length !== 0) {
      clients = clients.filter(client => client[0] !== clientname);
    }
    clients.push([clientname, websocket]);

    /* fs.readdir('../data/', (err, files) => {
      files.forEach(file => {
        fs.readFile('../data/'+file, (err, data) => {
          const runid = v4();
          const name = file.replace('.txt', '');
          runs.push([runid, name])
          websocket.send(`aocserver:run:${runid}:${name}:${data}`);
        })
      });
    }); */

    fs.readFile('../data/S1908.txt', (err, data) => {
      websocket.send('aocserver:run:1234:S1908:' + data);
    })
  }
  if (messagedata === 'result') {
    // ${runs.find(run => run[0] === split[3])![1]}
    console.log(`${clientname} got result ${split[4]} with runid ${split[3]}, solution `)
  }
}