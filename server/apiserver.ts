import { serve } from "https://deno.land/std/http/mod.ts";
import WebServer from "./webserver.ts";

export default class ApiServer {
    clients: [string, WebSocket][] = [];

    startServer(webserver: WebServer) {
        serve((req: Request) => {
            if (req.headers.get("Upgrade") !== "websocket") return new Response("Not Found", { status: 404 });
            
            const { socket: ws, response } = Deno.upgradeWebSocket(req);

            ws.onmessage = (e) => {
                const msg = e.data.toString();
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
                        console.log(`${clientname} got result ${result} with runid ${id}`)
                        const run = webserver.runs.find(run => run[0] === id)!;
                        run[1].send(JSON.stringify({ type: 'result', data: result, time: new Date().getTime() - run[2] }));
                    }
                    if (messagedata === 'solutions') {
                        webserver.solutions = webserver.solutions.filter(solution => solution[0] !== clientname)
                        webserver.solutions.push([clientname, split[3].split(', ')]);
                        webserver.updateSolutions();
                    }
                }
            }

            ws.onclose = () => {
                this.clients = this.clients.filter(client => client[1] !== ws);
            }

            return response;

        }, { port: 1337 });
    }
}