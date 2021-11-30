import WebSocket from 'ws';
import Runner from './runner';

const runner = new Runner();

function startWebsocket() {
    const ws = new WebSocket('ws://localhost:1337/');
    ws.on('message', (data) => {
        const message = data.toString();
        const split = message.split(':');
        if (split[0] !== 'aocserver') return;
        const command = split[1];
        if (command === 'connected') {
            ws.send("aocclient:ts:connected");
        } else if (command === 'solutions') {
            ws.send(`aocclient:ts:solutions:${runner.getSolutions().join(', ')}`);
        } else if (command === 'run') {
            const runid = split[2];
            const data = split.slice(4).join(':');
            const solution = split[3];
            console.log(`running ${solution} with runid ${runid}`);
            const result = runner.run(solution, data);
            ws.send(`aocclient:ts:result:${runid}:[${result[0]}, ${result[1]}]`);
        }
    });

    ws.on('open', () => {
        console.log('connected');
    })

    ws.on('close', () => {
        setTimeout(startWebsocket, 1000);
    });
}

startWebsocket();