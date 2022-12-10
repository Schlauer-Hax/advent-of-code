import ISolution from './ISolution.ts';

export default class S2210 implements ISolution {
    firstPart(input: string): string | number {
        const lines = input.split('\n');
        const res = [20, 60, 100, 140, 180, 220].map(clockcount => {
            let clock = 0;
            let line = 0;
            while (clock < clockcount) {
                if (lines[line].split(' ')[0] === 'addx') {
                    clock += 2;
                } else {
                    clock += 1;
                }
                line++;
            }
            return (1 + lines.slice(0, line - 1).filter(line => line.startsWith('addx')).map(line => line.split(' ')[1]).map(Number).reduce((a, b) => a + b, 0)) * clockcount;
        })
        return res.reduce((a, b) => a + b, 0);
    }
    secondPart(input: string): string | number {
        let cycle = 0;
        let x = 1;
        let output = '\n';
        function draw() {
            if (cycle % 40 === x || cycle % 40 === x + 1 || cycle % 40 === x + 2) {
                output += '#';
            } else {
                output += '.';
            }
            if (output.replaceAll('\n', '').length % 40 === 0) {
                output += '\n';
            }
        }
        const lines = input.split('\n');
        for (const line of lines) {
            cycle++;
            draw();
            if (line.startsWith('addx')) {
                cycle++;
                draw();
                x += Number(line.split(' ')[1]);
            }
        }
        return output;
    }
}