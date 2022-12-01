const ws = new WebSocket(document.location.origin.replace('https', 'ws').replace('http', 'ws')+'/wss');
ws.onopen = () => {
    document.getElementById('status').innerHTML = 'Connected';
    document.getElementById('solutions').disabled = false;
    document.getElementById('input').disabled = false;
    document.getElementById('run').disabled = false;
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
        document.getElementById('result').innerHTML = `${json.data} - ${json.time}ms`;
    }
}

ws.onclose = () => {
    console.log('Disconnected from server');
}