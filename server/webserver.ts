import express from 'express';
import expressWs from 'express-ws';
const { app, getWss, applyTo } = expressWs(express());
import WebSocket from 'ws';
import { ApiServer } from './apiserver';
import fs from 'fs';

export class WebServer {
  port: number;

  constructor(port: number) {
    this.port = port;
  }

  solutions: [string, string[]][] = [];
  // TODO: Type
  clients: any[] = [];
  runs: [number, any][] = [];

  startWebserver(apiserver: ApiServer) {
    app.use(express.static('public'))

    // Website Requests
    app.ws('/', (ws, req) => {
      ws.on('message', (msg) => {
        const split = msg.toString().split(':');

        if (split[0] === 'aocwebsite') {
          if (split[1] === 'connected') {
            this.clients.push(ws);
            ws.send('aocwebserver:solutions:' + this.solutions.join(':'));
          } else if (split[1] === 'run') {
            const solution = split[2];
            const input = split.slice(3).join(':');

            const id = Math.round(Math.random() * 100000)
            this.runs.push([id, ws]);
            const clientname = this.solutions.find(solutiondata => solutiondata[1].includes(solution))![0];
            apiserver.clients.find(client => client[0] === clientname)![1].send(`aocserver:run:${id}:${solution}:${input}`)
          } else if (split[1] === 'data') {
            const name = split[2];
            fs.readdir('../data/', (err, files) => {
              if (err) return;
              const possiblefile = files.find(file => file === name + '.txt');
              if (!possiblefile) return;
              fs.readFile('../data/' + possiblefile, (err, data) => {
                if (err) return;
                ws.send('aocwebserver:data:' + data.toString());
              })
            })
          }
        }
      });

      ws.on('close', () => {
        this.clients = this.clients.filter(client => client !== ws);
      })
    });

    app.listen(this.port, () => {
      console.log(`Webserver listening on http://localhost:${this.port}`)
    });
  }
}