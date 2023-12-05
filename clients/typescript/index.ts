import Runner from './runner.ts';
import "https://deno.land/x/dotenv@v3.2.0/load.ts";

const runner = new Runner();

function startWebsocket() {
    const ws = new WebSocket(Deno.env.get("WEBSOCKETURL") ?? 'ws://localhost:1337/');
    ws.addEventListener('message', async (data) => {
        const message = data.data;
        const split = message.split(':');
        if (split[0] !== 'aocserver') return;
        const command = split[1];
        if (command === 'solutions') {
            ws.send(`aocclient:ts:solutions:${runner.getSolutions().join(', ')}`);
        } else if (command === 'run') {
            const runid = split[2];
            const data = split.slice(4).join(':');
            const solution = split[3];
            console.log(`running ${solution} with runid ${runid}`);
            const result = await runner.run(solution, data);
            ws.send(`aocclient:ts:result:${runid}:[${result[0]}, ${result[1]}]`);
        }
    });

    ws.addEventListener('open', () => {
        console.log('connected');
        ws.send("aocclient:ts:connected");
    })

    ws.addEventListener('close', () => {
        console.log('trying to reconnect');
        setTimeout(startWebsocket, 1000);
    });
}
runner.loadSolutions().then(() => {
    startWebsocket();
});