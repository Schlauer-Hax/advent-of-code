import Runner from './runner.ts';

const runner = new Runner();

function startWebsocket() {
    const ws = new WebSocket('ws://localhost:1337/');
    ws.addEventListener('message', (data) => {
        const message = data.data;
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

    ws.addEventListener('open', () => {
        console.log('connected');
    })

    ws.addEventListener('close', () => {
        setTimeout(startWebsocket, 1000);
    });

    ws.addEventListener('error', console.error);
}

startWebsocket();