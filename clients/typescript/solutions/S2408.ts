import ISolution from "./ISolution.ts";

export default class S2408 implements ISolution {
    firstPart(input: string): (number | string) | Promise<number | string> {
        const lines = input.split("\n").map(line => line.split(""));
        const antinodes = [];
        for (const freq of [ "abcdefghijklmnopqrstuvwxyz".split(""), "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""), "0123456789".split("") ].flat()) {
            const positions = lines.map((line, y) => line.map((char, x) => char === freq ? { x, y } : null).filter(pos => pos !== null)).flat();
            for (const pos1 of positions) {
                for (const pos2 of positions) {
                    if (pos1.x === pos2.x && pos1.y === pos2.y) {
                        continue;
                    }
                    const xdiff = pos1.x - pos2.x;
                    const ydiff = pos1.y - pos2.y;
                    if (pos1.x + xdiff !== pos2.x && pos1.y + ydiff !== pos2.y) {
                        antinodes.push({ x: pos1.x + xdiff, y: pos1.y + ydiff });
                    } else {
                        antinodes.push({ x: pos1.x - xdiff, y: pos1.y - ydiff });
                    }
                    if (pos2.x + xdiff !== pos1.x && pos2.y + ydiff !== pos1.y) {
                        antinodes.push({ x: pos2.x + xdiff, y: pos2.y + ydiff });
                    } else {
                        antinodes.push({ x: pos2.x - xdiff, y: pos2.y - ydiff });
                    }
                }
            }
        }
        return antinodes.filter(pos => pos.x >= 0 && pos.y >= 0 && pos.x < lines[ 0 ].length && pos.y < lines.length).filter((pos, index, arr) => arr.findIndex(p => p.x === pos.x && p.y === pos.y) === index).length;
    }
    secondPart(input: string): (number | string) | Promise<number | string> {
        const lines = input.split("\n").map(line => line.split(""));
        const antinodes = [];
        const pairs: [{x: number, y: number}, {x: number, y:number}][] = [];
        for (const freq of [ "abcdefghijklmnopqrstuvwxyz".split(""), "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""), "0123456789".split("") ].flat()) {
            const positions = lines.map((line, y) => line.map((char, x) => char === freq ? { x, y } : null).filter(pos => pos !== null)).flat();
            for (const pos1 of positions) {
                for (const pos2 of positions) {
                    if (pos1.x === pos2.x && pos1.y === pos2.y) {
                        continue;
                    }
                    if (!pairs.find(pair => pair[ 0 ] === pos1 && pair[ 1 ] === pos2) && !pairs.find(pair => pair[ 0 ] === pos2 && pair[ 1 ] === pos1)) {
                        pairs.push([ pos1, pos2 ]);
                    }
                    for (let offset = 1; offset < 100; offset++) {
                        const xdiff = (pos1.x - pos2.x) * offset;
                        const ydiff = (pos1.y - pos2.y) * offset;
                        if (pos1.x + xdiff !== pos2.x && pos1.y + ydiff !== pos2.y) {
                            antinodes.push({ x: pos1.x + xdiff, y: pos1.y + ydiff });
                        } else {
                            antinodes.push({ x: pos1.x - xdiff, y: pos1.y - ydiff });
                        }
                        if (pos2.x + xdiff !== pos1.x && pos2.y + ydiff !== pos1.y) {
                            antinodes.push({ x: pos2.x + xdiff, y: pos2.y + ydiff });
                        } else {
                            antinodes.push({ x: pos2.x - xdiff, y: pos2.y - ydiff });
                        }
                    }
                }
            }
        }
        return antinodes.concat(pairs.flat()).filter(pos => pos.x >= 0 && pos.y >= 0 && pos.x < lines[ 0 ].length && pos.y < lines.length).filter((pos, index, arr) => arr.findIndex(p => p.x === pos.x && p.y === pos.y) === index).length;
        for (let y = 0; y < lines.length; y++) {
            let out = "";
            for (let x = 0; x < lines[0].length; x++) {
                out += antinodes.find(pos => pos.x === x && pos.y === y) ? "X" : lines[ y ][ x ];
            }
            console.log(out);
        }
    }

}