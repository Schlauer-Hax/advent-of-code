import WebSocket from "ws";
import { WebServer } from "./webserver";


export class ApiServer {
    port: number;
  
    constructor (port: number) {
      this.port = port;
    }

    clients: [string, WebSocket][] = []
    startApi(webserver: WebServer) {
        const wss = new WebSocket.Server({ port: this.port }, () => {
            console.log(`Api listening on http://localhost:${this.port}`)
        });
        wss.on('connection', (ws, req) => {
            ws.on('message', (msgdata) => {
                const msg = msgdata.toString();
                const split = msg.split(':');

                // Code Runner Requests
                if (split[0] === 'aocclient') {
                    const clientname = split[1];
                    const messagedata = split[2];

                    if (messagedata === 'connected') {
                        console.log(`${clientname} connected!`)
                        if (this.clients.filter(client => client[0] === clientname).length !== 0) {
                            this.clients = this.clients.filter(client => client[0] !== clientname);
                        }
                        this.clients.push([clientname, ws]);
                        ws.send('aocserver:solutions');
                    }
                    if (messagedata === 'result') {
                        const id = Number(split[3]);
                        const result = split.slice(4).join(':');
                        console.log(`${clientname} got result ${result} with runid ${id}, solution `)
                        webserver.runs.find(run => run[0] === id)![1].send(`aocwebserver:result:${result}`)
                    }
                    if (messagedata === 'solutions') {
                        webserver.solutions = webserver.solutions.filter(solution => solution[0] !== clientname)
                        webserver.solutions.push([clientname, split[3].split(', ')]);
                    }
                }
            })

            ws.send('aocserver:connected');
        })
    }
}