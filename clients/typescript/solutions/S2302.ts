import ISolution from "./ISolution.ts";

export default class S2302 implements ISolution {
    firstPart(input: string): string | number {
        return input.split('\n').map((line, index) => {
            return [index, line.split(': ')[1].split('; ').map(s => s.split(', ').map(r => r.split(' ')).some(s => (s[1] === 'red' && Number(s[0]) > 12) || (s[1] === 'green' && Number(s[0]) > 13) || (s[1] === 'blue' && Number(s[0]) > 14))).every(s => !s)] as [number, boolean];
        }).filter(s => s[1]).reduce((a, b) => a + b[0]+1, 0);
    }
    secondPart(input: string): string | number {
        return input.split('\n').map((line) => {
            const colors = line.split(': ')[1].split('; ').map(s => s.split(', ')).flat().map(r => r.split(' '));
            return Math.max(...colors.filter(s => s[1] === 'red').map(s => Number(s[0]))) * Math.max(...colors.filter(s => s[1] === 'green').map(s => Number(s[0]))) * Math.max(...colors.filter(s => s[1] === 'blue').map(s => Number(s[0])));
        }).reduce((a, b) => a + b, 0);
    }

}