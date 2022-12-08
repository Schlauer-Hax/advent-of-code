import ISolution from "./ISolution.ts";

export default class S2208 implements ISolution {
    firstPart(input: string): string | number {
        const lengths = input.split('\n').map(line => line.split('').map(Number));
        const visible: boolean[][] = [...Array(input.split('\n').length)].map(() => Array(input.split('\n')[0].length).fill(false));
        const x = input.split('\n')[0].length;
        const y = input.split('\n').length;
        for (let i = 0; i < y; i++) {
            for (let j = 0; j < x; j++) {
                visible[i][j] = (i === 0 || i === y - 1 || j === 0 || j === x - 1) || this.someAround(i, j, lengths)
            }
        }
        return visible.reduce((a, b) => a + b.filter(v => v).length, 0);
    }
    secondPart(input: string): string | number {
        const lengths = input.split('\n').map(line => line.split('').map(Number));
        let best = 0;
        for (let i = 0; i < input.split('\n').length; i++) {
            for (let j = 0; j < input.split('\n')[0].length; j++) {
                const score = this.getScore(j, i, lengths);
                if (score > best) {
                    best = score;
                }
            }
        }
        return best
    }
    someAround(i: number, j: number, lengths: number[][]): boolean {
        return [
            lengths[i].slice(0, j).every(height => height < lengths[i][j]), 
            lengths[i].slice(j + 1).every(height => height < lengths[i][j]),
            lengths.slice(0, i).every(row => row[j] < lengths[i][j]),
            lengths.slice(i + 1).every(row => row[j] < lengths[i][j])
        ].some(val => val);
    }
    getScore(x: number, y: number, heights: number[][]): number {
        let left = heights[y].slice(0, x).reverse().findIndex(height => height >= heights[y][x]);
        let right = heights[y].slice(x + 1).findIndex(height => height >= heights[y][x]);
        let up = heights.slice(0, y).reverse().findIndex(row => row[x] >= heights[y][x]);
        let down = heights.slice(y + 1).findIndex(row => row[x] >= heights[y][x]);
        left = left === -1 ? x : left + 1;
        right = right === -1 ? heights[y].length - x - 1 : right + 1;
        up = up === -1 ? y : up + 1;
        down = down === -1 ? heights.length - y - 1 : down + 1;
        return left * right * up * down;
    }
}
