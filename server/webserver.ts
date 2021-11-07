import express from 'express';
import expressWs from 'express-ws';
const { app, getWss, applyTo } = expressWs(express());
import WebSocket from 'ws';


export function startWebserver(webport: number, apiport: number) {
  app.get('/', function (req, res, next) {
    console.log('get route');
    res.end();
  });

  let solutions: [string, string[]][] = [];
  // TODO: Type
  let clients: any[] = [];
  let runs: [number, any][] = [];

  const aws = new WebSocket(`ws://localhost:${apiport}`);
  aws.onopen = () => {
    aws.send('aocwebserver:connected')
  }

  aws.onmessage = (event) => {
    const message = event.data.toString();
    const split = message.split(':')
    if (split[0] === 'aocserver') {
      if (split[1] === 'solutions') {
        solutions = split.slice(2).map(solutionblock => [solutionblock.split(',')[0], solutionblock.split(',').slice(1)])
        clients.forEach(client => client.send('aocwebserver:solutions:' + solutions.join(':')))
      } else {
        const id = Number(split[2]);
        const result = split.slice(3).join(':');
        const possibleclient = runs.find(run=>run[0]===id);
        if (possibleclient=== undefined) return;
        possibleclient[1].send('aocwebserver:result:'+result);
      }
    }
  }

  // Website Requests
  app.ws('/', function (ws, req) {
    ws.on('message', function (msg) {
      const split = msg.toString().split(':');

      if (split[0] === 'aocwebsite') {
        if (split[1] === 'connected') {
          clients.push(ws);
          ws.send('aocwebserver:solutions:' + solutions.join(':'));
        } else if (split[1] === 'run') {
          const solution = split[2];
          const input = split.slice(3).join(':');
          
          const id = Math.round(Math.random()*100000)
          runs.push([id, ws]);
          aws.send(`aocwebserver:run:${id}:${solution}:${input}`)
        }
      }
    });

    ws.on('close', () => {
      clients = clients.filter(client => client !== ws);
    })
  });

  app.listen(webport, () => {
    console.log(`Webserver listening on http://localhost:${webport}`)
  });
}