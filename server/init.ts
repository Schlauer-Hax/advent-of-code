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

let solutions: [string, string[]][] = [];

let runs: [string, string][] = []

let aocwebserver: WebSocket;

function handleMessage(message: string, websocket: WebSocket) {
  const split = message.split(':');
  if (split[0] === 'aocclient') {
    const clientname = split[1];
    const messagedata = split[2];

    if (messagedata === 'connected') {
      console.log(`${clientname} connected!`)
      if (clients.filter(client => client[0] === clientname).length !== 0) {
        clients = clients.filter(client => client[0] !== clientname);
      }
      clients.push([clientname, websocket]);
      websocket.send('aocserver:solutions');
    }
    if (messagedata === 'result') {
      console.log(`${clientname} got result ${split[4]} with runid ${split[3]}, solution `)
    }
    if (messagedata === 'solutions') {
      solutions = solutions.filter(solution => solution[0]!==clientname)
      solutions.push([clientname, split[3].split(', ')]);
      aocwebserver.send('aocserver:solutions:'+solutions.join(':'))
    }
  } else if (split[0] === 'aocwebserver') {
    if (split[1] === 'connected') {
      aocwebserver = websocket;
    }
  }
}