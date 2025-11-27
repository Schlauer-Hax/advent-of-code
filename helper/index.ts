import "@std/dotenv/load";
import { exists } from "@std/fs";
import { readKeypress } from "keypress";
import { paste } from 'clipboard';

let realinput = false;
console.log('Connecting to websocket...');
websocket();
function websocket() {
  const ws = new WebSocket('ws://localhost:9000/wss');

  let latestsolution: string;
  ws.onmessage = (event) => {
    const json = JSON.parse(event.data);
    if (json.type === 'solutions') {
      console.log('Solutions received, triggering latest solution...');
      latestsolution = json.data.sort((a: string, b: string) => Number(b.replace('S', '')) - Number(a.replace('S', '')))[ 0 ]
      if (realinput) {
        ws.send(JSON.stringify({
          type: 'data',
          name: latestsolution,
        }));
      }
      sendTestInput();
    } else if (json.type === 'result') {
      console.log(`${json.data}`);
    } else if (json.type === 'data') {
      if (realinput) {
        ws.send(JSON.stringify({ type: 'run', solution: latestsolution, input: json.data }));
      }
    }
  };

  ws.onopen = async () => {
    console.log('Connected to websocket');
    console.log("Press 'r' to toggle real input testing, 'v' to copy clipboard to testinput.txt, 'ctrl+c' to exit");
    for await (const keypress of readKeypress()) {
      if (keypress.key === 'r') {
        realinput = !realinput;
        console.log(`Turned ${realinput ? 'on' : 'off'} real input testing`);
        if (latestsolution) {
          sendTestInput();
          if (realinput) {
            ws.send(JSON.stringify({
              type: 'data',
              name: latestsolution,
            }));
          }
        }
      }
      if (keypress.key === 'v') {
        let input = await paste();
        input = input.replaceAll('\r\n', '\n');
        while (input.endsWith('\n')) {
          input = input.slice(0, -1);
        }
        Deno.writeTextFileSync("testinput.txt", input);
        console.log('Copied clipboard to testinput.txt');
        sendTestInput();
      }
      if (keypress.key === 'c' && keypress.ctrlKey) {
        Deno.exit();
      }
    }
  }

  ws.onclose = () => {
    console.log('Disconnected from websocket');
    setTimeout(() => {
      console.log('Reconnecting to websocket...');
      websocket();
    }, 1000);
  }

  ws.onerror = (error) => {
    console.log((error as ErrorEvent).message);
  }

  async function sendTestInput() {
    if (await exists('./testinput.txt')) {
      const testinput = Deno.readTextFileSync('./testinput.txt');
      if (testinput !== '') {
        ws.send(JSON.stringify({
          type: 'run',
          solution: latestsolution,
          input: testinput,
        }));
      }
    }
  }
}