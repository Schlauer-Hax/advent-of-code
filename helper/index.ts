import "https://deno.land/x/dotenv@v3.2.0/load.ts";

const date = new Date()
if (date.getMonth() === 11) {
  console.log('Checking for downloadable data...')
  const filename = `S${date.getFullYear().toString().slice(-2)}${date.getDate().toString().padStart(2, '0')}.txt`;
  if (Array.from(Deno.readDirSync('../data')).map(entry => entry.name).includes(filename)) {
    console.log('Data is already downloaded.')
  } else {
    console.log('Downloading data...')
    const data = await fetch(`https://adventofcode.com/${date.getFullYear()}/day/${date.getDate()}/input`, {
      headers: {
        cookie: 'session=' + Deno.env.get('AOC_SESSION')
      }
    }).then(response => response.text())
    Deno.writeTextFileSync('../data/' + filename, data.trimEnd())
  }
} else {
  console.log('Not December, skipping data download.')
}

console.log('Connecting to websocket...');
websocket();
function websocket() {
  const ws = new WebSocket('ws://localhost:9000/wss');

  let latestsolution: string;
  ws.onmessage = (event) => {
    const json = JSON.parse(event.data);
    if (json.type === 'solutions') {
      console.log('Solutions received, triggering latest solution...');
      latestsolution = json.data.sort((a: string, b: string) => Number(b.replace('S', '')) - Number(a.replace('S', '')))[0]
      ws.send(JSON.stringify({
        type: 'data',
        name: latestsolution,
      }));
      const testinput = Deno.readTextFileSync('./testinput.txt');
      if (testinput !== '') {
        ws.send(JSON.stringify({
          type: 'run',
          solution: latestsolution,
          input: testinput,
        }));
      }
    } else if (json.type === 'result') {
      console.log(`${json.data}`);
    } else if (json.type === 'data') {
      ws.send(JSON.stringify({
        type: 'run',
        solution: latestsolution,
        input: json.data
      }));
    }
  };

  ws.onopen = () => {
    console.log('Connected to websocket');
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
}