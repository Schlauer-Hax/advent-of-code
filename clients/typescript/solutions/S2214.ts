import ISolution from './ISolution.ts';

export default class S2214 implements ISolution {
    firstPart(input: string): string | number {
        const lines = input.split('\n').map(line => line.split(' -> ').map(item => item.split(',').map(Number)));
        const blocks: [number, number][] = [];
        lines.forEach(items => items.slice(0, -1).forEach((item, index) => {
            const [xstart, ystart] = item
            const [xend, yend] = items[index + 1];
            for (const x of new Array(Math.abs(xend - xstart)+1).fill(0).map((_, i) => Math.min(xstart, xend) + i)) {
                for (const y of new Array(Math.abs(yend - ystart)+1).fill(0).map((_, i) => Math.min(ystart, yend) + i)) {
                    blocks.push([x, y]);
                }
            }
        }))
        const filled: [number, number][] = [];
        function checkFree(x: number, y: number) {
            return !(blocks.some(item => item[0] === x && item[1] === y) || filled.some(item => item[0] === x && item[1] === y));
        }
        function belowLowest(y: number) {
            return lines.every(items => items.every(item => item[1] < y));
        }
        filler: while (true) {
            let x = 500;
            let y = 0;
            while (true) {
                if (belowLowest(y)) {
                    break filler;
                } else if (checkFree(x, y + 1)) {
                    y++;
                } else if (checkFree(x - 1, y + 1)) {
                    y++;
                    x--;
                } else if (checkFree(x + 1, y + 1)) {
                    y++;
                    x++;
                } else {
                    break;
                }
            }
            // deno-lint-ignore no-unreachable
            filled.push([x, y]);
        }
        return filled.length;
    }
    secondPart(input: string): string | number {
        const lines = input.split('\n').map(line => line.split(' -> ').map(item => item.split(',').map(Number)));
        const largesty = Math.max(...lines.map(items => Math.max(...items.map(item => item[1]))));
        const blocks: string[] = [];
        for (let x = 0; x < 5000; x++) {
            blocks.push(String(x-1000)+','+String(largesty+2));
        }
        lines.forEach(items => items.slice(0, -1).forEach((item, index) => {
            const [xstart, ystart] = item
            const [xend, yend] = items[index + 1];
            for (const x of new Array(Math.abs(xend - xstart)+1).fill(0).map((_, i) => Math.min(xstart, xend) + i)) {
                for (const y of new Array(Math.abs(yend - ystart)+1).fill(0).map((_, i) => Math.min(ystart, yend) + i)) {
                    blocks.push(x+','+y);
                }
            }
        }))
        const filled: string[] = [];
        function checkFree(x: number, y: number) {
            return !(blocks.includes(x+','+y) || filled.includes(x+','+y));
        }
        filler: while (true) {
            let x = 500;
            let y = 0;
            while (true) {
                if (checkFree(x, y + 1)) {
                    y++;
                } else if (checkFree(x - 1, y + 1)) {
                    y++;
                    x--;
                } else if (checkFree(x + 1, y + 1)) {
                    y++;
                    x++;
                } else {
                    if (y === 0 && x === 500) {
                        filled.push(x+','+y);
                        break filler;
                    }
                    break;
                }
            }
            filled.push(x+','+y);
        }
        return filled.length;
    }
}