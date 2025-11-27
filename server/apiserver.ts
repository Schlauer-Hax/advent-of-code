import WebServer from "./webserver.ts";
import { downloadMissingData } from "./downloader.ts";

export default class ApiServer {
    clients: [string, WebSocket][] = [];

    startServer(webserver: WebServer) {
        Deno.serve({ port: 1337 }, (req) => {
            if (req.headers.get("Upgrade") !== "websocket") return new Response("Not Found", { status: 404 });
            
            const { socket: ws, response } = Deno.upgradeWebSocket(req);

            ws.onmessage = (e) => {
                const msg: string = e.data.toString();
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
                        const time = Number(split[4]);
                        const result = split.slice(5).join(':');
                        console.log(`${clientname} got result ${result} with runid ${id} in ${time}ms`);
                        const run = webserver.runs.find(run => run[0] === id)!;
                        run[1].send(JSON.stringify({ type: 'result', data: result, time: time }));
                    }
                    if (messagedata === 'solutions') {
                        webserver.solutions = webserver.solutions.filter(solution => solution[0] !== clientname)
                        webserver.solutions.push([clientname, split[3].split(', ')]);
                        downloadMissingData(webserver.solutions.map(sol => sol[1]).flat());
                        webserver.updateSolutions();
                    }
                }
            }

            ws.onclose = () => {
                this.clients = this.clients.filter(client => client[1] !== ws);
            }

            return response;
        });
    }
}