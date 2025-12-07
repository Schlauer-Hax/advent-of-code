import ISolution from "./ISolution.ts";

export default class S2507 implements ISolution {
    firstPart(input: string): string | number {
        const lines = input.split("\n").map(line => line.split(""));
        let positions = [ lines[ 0 ].indexOf("S") ];
        let splits = 0;
        for (let i = 1; i < lines.length; i++) {
            const newPositions: Set<number> = new Set();
            for (const position of positions) {
                const currentChar = lines[ i ][ position ];
                if (currentChar === ".") {
                    newPositions.add(position);
                } else if (currentChar === "^") {
                    splits++;
                    newPositions.add(position - 1);
                    newPositions.add(position + 1);
                }
            }
            positions = Array.from(newPositions);
        }
        return splits;
    }
    secondPart(input: string): string | number {
        const lines = input.split("\n").map(line => line.split(""));
        let timelines = 1;
        let positions = new Map<number, number>();
        positions.set(lines[0].indexOf("S"), 1);
        for (let i = 1; i < lines.length; i++) {
            const newPositions: Map<number, number> = new Map();
            for (const [position, count] of positions) {
                const currentChar = lines[i][position];
                if (currentChar === ".") {
                    newPositions.set(position, (newPositions.get(position) || 0) + count);
                } else if (currentChar === "^") {
                    newPositions.set(position - 1, (newPositions.get(position - 1) || 0) + count);
                    newPositions.set(position + 1, (newPositions.get(position + 1) || 0) + count);
                    timelines += count;
                }
            }
            positions = newPositions;
        }
        return timelines;
    }
}