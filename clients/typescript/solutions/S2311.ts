import ISolution from "./ISolution.ts";

export default class S2311 implements ISolution {
    firstPart(input: string): string | number {
        const lines = input.split('\n');
        const cols = lines[0].length;
        const rows = lines.length;
        const expandedy = [];
        for (let i = 0; i < rows; i++) {
            if (!lines[i].includes('#')) {
                expandedy.push(i);
            }
        }
        const expandedx = [];
        for (let i = 0; i < cols; i++) {
            if (!lines.map(line => line[i]).includes('#')) {
                expandedx.push(i);
            }
        }
        const positions: [number, number][] = [];
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                if (lines[y][x] === '#') {
                    positions.push([x + expandedx.filter(item => item < x).length, y + expandedy.filter(item => item < y).length]);
                }
            }
        }
        const pairs = positions.map((v, i, arr) => arr.slice(i + 1).map(w => [v, w])).flat();
        return pairs.map(([[x1, y1], [x2, y2]]) => Math.abs(x1-x2) + Math.abs(y1-y2)).reduce((a, b) => a + b, 0);
    }
    secondPart(input: string): string | number {
        const lines = input.split('\n');
        const cols = lines[0].length;
        const rows = lines.length;
        const expandedy = [];
        for (let i = 0; i < rows; i++) {
            if (!lines[i].includes('#')) {
                expandedy.push(i);
            }
        }
        const expandedx = [];
        for (let i = 0; i < cols; i++) {
            if (!lines.map(line => line[i]).includes('#')) {
                expandedx.push(i);
            }
        }
        const positions: [number, number][] = [];
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                if (lines[y][x] === '#') {
                    positions.push([x + expandedx.filter(item => item < x).length*999999, y + expandedy.filter(item => item < y).length*999999]);
                }
            }
        }
        const pairs = positions.map((v, i, arr) => arr.slice(i + 1).map(w => [v, w])).flat();
        return pairs.map(([[x1, y1], [x2, y2]]) => Math.abs(x1-x2) + Math.abs(y1-y2)).reduce((a, b) => a + b, 0);
    }
}