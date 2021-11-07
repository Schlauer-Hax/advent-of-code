import WebSocket from "ws";



export function startApi(apiport: number) {
    const wss = new WebSocket.Server({ port: apiport }, () => {
        console.log(`Api listening on http://localhost:${apiport}`)
    });

    let clients: [string, any][] = [];
    let solutions: [string, string[]][] = []

    let runs: [number, WebSocket][] = [];

    let webserversocket: WebSocket;
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
                    if (clients.filter(client => client[0] === clientname).length !== 0) {
                        clients = clients.filter(client => client[0] !== clientname);
                    }
                    clients.push([clientname, ws]);
                    ws.send('aocserver:solutions');
                }
                if (messagedata === 'result') {
                    const id = Number(split[3]);
                    const result = split.slice(4).join(':');
                    console.log(`${clientname} got result ${result} with runid ${id}, solution `)
                    // TODO: Back to Website
                    runs.find(run => run[0]===id)![1].send(`aocserver:result:${id}:${result}`)
                }
                if (messagedata === 'solutions') {
                    solutions = solutions.filter(solution => solution[0] !== clientname)
                    solutions.push([clientname, split[3].split(', ')]);
                    webserversocket.send('aocserver:solutions:'+solutions.join(':'))
                }
            } else 
            // Webserver Requests
            if (split[0]==='aocwebserver') {
                const messagedata = split[1];
                if (!webserversocket) webserversocket = ws;
                if (messagedata === 'connected') {
                    ws.send('aocserver:solutions:'+solutions.join(':'))
                } else if (messagedata === 'run') {
                    const id = Number(split[2])
                    const solution = split[3];
                    const input = split.slice(4).join(':');
                    const client = clients.find(client => client[0] === solutions.find(solutionblock => solutionblock[1].includes(solution))![0]);

                    runs.push([id, ws])

                    client![1].send(`aocserver:run:${id}:${solution}:${input}`)
                }
            }
        })

        ws.send('aocserver:connected');
    })
}