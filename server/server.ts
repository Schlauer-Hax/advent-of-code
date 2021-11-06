import express from 'express';
import expressWs from 'express-ws';
const { app, getWss, applyTo } = expressWs(express());

app.get('/', function (req, res, next) {
  console.log('get route');
  res.end();
});

let solutions: [string, string[]][] = [];

app.ws('/', function (ws, req) {
  ws.on('message', function (msg) {
    //console.log(msg);
    const split = msg.toString().split(':');
    if (split[0] !== 'aocwebsite') return;

    const command = split[1];
    if (command === 'connected') {
      ws.send('aocwebserver:solutions:' + solutions.join(':'));
    } else if (command === 'run') {
      // TODO: dont use shift
      split.shift();
      split.shift();
      const solution = split[0];
      split.shift();
      const input = split.join(':');
      //console.log(solutions)
      console.log(solution)
      // TODO: Check if null
      const clientname = solutions.filter(client =>
        client[1].includes(solution)
      )[0][0]
      // TODO: Check if null
      clients.filter(client => client[0]===clientname)[0][1].send('aocserver:run:1337:'+solution+':'+input)
    }
  });
  ws.on('close', () => {
    console.log('closed')
  })
});

// TODO: Type, run on other port in production
let clients: [string, any][] = [];
app.ws('/api', (ws, req) => {
  ws.on('message', (msgdata) => {
    const msg = msgdata.toString();
    const split = msg.split(':');
    if (split[0] === 'aocclient') {
      const clientname = split[1];
      const messagedata = split[2];

      if (messagedata === 'connected') {
        console.log(`${clientname} connected!`)
        if (clients.filter(client => client[0] === clientname).length !== 0) {
          clients = clients.filter(client => client[0] !== clientname);
        }
        clients.push([clientname, ws]);
        ws.send('aocserver:solutions');
      }
      if (messagedata === 'result') {
        console.log(`${clientname} got result ${split[4]} with runid ${split[3]}, solution `)
        // TODO: Back to Website
      }
      if (messagedata === 'solutions') {
        solutions = solutions.filter(solution => solution[0] !== clientname)
        solutions.push([clientname, split[3].split(', ')]);
      }
    }
  })

  ws.send('aocserver:connected');
})

app.listen(9000);