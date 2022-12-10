function startConnection() {
    const ws = new WebSocket(document.location.origin.replace('https', 'wss').replace('http', 'ws') + '/wss');

    ws.onopen = () => {
        document.getElementById('solutions').addEventListener('change', () => {
            ws.send(JSON.stringify({
                type: 'data',
                name: document.getElementById('solutions').value,
            }));
        });
        document.getElementById('run').addEventListener('click', () => {
            document.getElementById('result').innerHTML = 'Waiting for Solutions...';
            ws.send(JSON.stringify({
                type: 'run',
                solution: document.getElementById('solutions').value,
                input: document.getElementById('input').value,
            }));
        });
        updateStatus(ws);
    };

    ws.onmessage = (event) => {
        const json = JSON.parse(event.data)
        if (json.type === 'solutions') {
            document.getElementById('solutions').innerHTML =
                json.data
                    .sort((a, b) => b.replace('S', '') - a.replace('S', ''))
                    .map((solution) => `<option>${solution}</option>`)
                    .join('');
            ws.send(JSON.stringify({
                type: 'data',
                name: document.getElementById('solutions').value
            }));
        } else if (json.type === 'data') {
            document.getElementById('input').value = json.data;
        } else if (json.type === 'result') {
            document.getElementById('result').innerHTML = `${json.data.replaceAll('\n', '<br>')} - ${json.time}ms`;
        }
    }

    ws.onclose = () => {
        updateStatus(ws);
        setTimeout(() => startConnection(), 1000);
    }

    function updateStatus(ws) {
        const connected = ws.readyState === 1;
        document.getElementById('status').innerHTML = connected ? 'Connected' : 'Disconnected, trying to reconnect...';
        document.getElementById('solutions').disabled = !connected;
        document.getElementById('input').disabled = !connected;
        document.getElementById('run').disabled = !connected;
    }
}

startConnection();