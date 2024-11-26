import ISolution from "./ISolution.ts";
import { createCanvas } from "https://deno.land/x/canvas@v1.4.2/mod.ts";

export default class S2309 implements ISolution {
    firstPart(input: string): string | number {
        const matrix = input.split('\n').map(m => m.split(''));
        const startPos: [number, number] = [matrix[matrix.findIndex(x => x.includes('S'))].indexOf('S'), matrix.findIndex(x => x.includes('S'))]
        let pos1prev: [number, number] = startPos;
        let pos2prev: [number, number] = startPos;
        let [pos1, pos2] = connected(matrix, startPos);
        let steps = 1;
        while (!pos1.every((item, index) => item === pos2[index])) {
            const temppos1 = pos1;
            const temppos2 = pos2;
            pos1 = connected(matrix, pos1).find(x => !x.every((item, index) => item === pos1prev[index]))!
            pos2 = connected(matrix, pos2).find(x => !x.every((item, index) => item === pos2prev[index]))!
            pos1prev = temppos1;
            pos2prev = temppos2;
            steps += 1;
        }
        return steps;
    }
    secondPart(input: string): string | number {
        const matrix = input.split('\n').map(m => m.split(''));
        const startPos: [number, number] = [matrix[matrix.findIndex(x => x.includes('S'))].indexOf('S'), matrix.findIndex(x => x.includes('S'))]
        let pos1prev: [number, number] = startPos;
        let pos2prev: [number, number] = startPos;
        let [pos1, pos2] = connected(matrix, startPos);
        const looppos1 = [pos1, startPos]
        const looppos2 = [pos2, startPos]
        while (!pos1.every((item, index) => item === pos2[index])) {
            const temppos1 = pos1;
            const temppos2 = pos2;
            pos1 = connected(matrix, pos1).find(x => !x.every((item, index) => item === pos1prev[index]))!
            pos2 = connected(matrix, pos2).find(x => !x.every((item, index) => item === pos2prev[index]))!
            pos1prev = temppos1;
            pos2prev = temppos2;
            looppos1.push(pos1);
            looppos2.unshift(pos2);
        }
        const canvas = createCanvas(matrix[0].length, matrix.length);
        const ctx = canvas.getContext("2d");
        ctx.beginPath();
        const loop = [...looppos1, ...looppos2];
        for (const pos of loop) {
            ctx.lineTo(pos[0], pos[1]);
        }
        ctx.closePath();
        let count = 0;
        for (let x = 0; x < matrix[0].length; x++) {
            for (let y = 0; y < matrix.length; y++) {
                if (!loop.some(pos => pos[0] === x && pos[1] === y)) {
                    count += ctx.isPointInPath(x, y, undefined) ? 1 : 0;
                }
            }
        }
        return count;
    }
}

function connected(matrix: string[][], [x, y]: [number, number]): [number, number][] {
    const possible = []
    if (matrix[y+1] && ['F', '|', '7', 'S'].includes(matrix[y][x]) && ['L', '|', 'J'].includes(matrix[y+1][x])) {
        possible.push([x, y+1])
    }
    if (matrix[y-1] && ['L', '|', 'J', 'S'].includes(matrix[y][x]) && ['F', '|', '7'].includes(matrix[y-1][x])) {
        possible.push([x, y-1]);
    }
    if (['F', '-', 'L', 'S'].includes(matrix[y][x]) && ['J', '-', '7'].includes(matrix[y][x+1])) {
        possible.push([x+1, y]);
    }
    if (['J', '-', '7', 'S'].includes(matrix[y][x]) && ['L', '-', 'F'].includes(matrix[y][x-1])) {
        possible.push([x-1, y]);
    }
    return possible as [number, number][];
}