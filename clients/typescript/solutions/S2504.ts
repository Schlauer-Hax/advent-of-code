import ISolution from "./ISolution.ts";

export default class S2504 implements ISolution {
    firstPart(input: string): string | number {
        const coords = input.split("\n").map(line => line.split(""));
        let result = 0;
        coords.forEach((row, rowi) => {
            row.forEach((col, coli) => {
                if (col === "@" && this.countAdjacent(coords, rowi, coli) < 4) {
                    result++;
                }
            })
        });
        return result;
    }
    countAdjacent(coords: string[][], row: number, col: number): number {
        let count = 0;
        for (let r = row - 1; r <= row + 1; r++) {
            for (let c = col - 1; c <= col + 1; c++) {
                if (r === row && c === col) continue;
                if (r >= 0 && r < coords.length && c >= 0 && c < coords[0].length) {
                    if (coords[r][c] === "@" || coords[r][c] === "#") {
                        count++;
                    }
                }
            }
        }
        return count;
    }
    secondPart(input: string): string | number {
        const coords = input.split("\n").map(line => line.split(""));
        let result = 0;
        let prevresult = -1;
        while (result !== prevresult) {
            prevresult = result;
            coords.forEach((row, rowi) => {
                row.forEach((col, coli) => {
                    if (col === "@" && this.countAdjacent(coords, rowi, coli) < 4) {
                        result++;
                        coords[rowi][coli] = "#";
                    }
                })
            });
            coords.forEach((row, rowi) => {
                row.forEach((col, coli) => {
                    if (col === "#") {
                        coords[rowi][coli] = ".";
                    }
                })
            });
        }
        return result;
    }
}