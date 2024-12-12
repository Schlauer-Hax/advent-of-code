import ISolution from "./ISolution.ts";

export default class S2412 implements ISolution {
    firstPart(input: string): (number | string) | Promise<number | string> {
        const map = input.split("\n").map((x) => x.split(""));
        return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(letter => {
            const coords = map.map((x, xi) => x.map((y, yi) => y === letter ? [ xi, yi ] : null).filter(x => x !== null)).flat();
            if (coords.length === 0) {
                return 0;
            }
            const farms: number[][][] = [];
            let left = coords.filter(([ x, y ]) => !farms.some(farm => farm.some(([ fx, fy ]) => fx === x && fy === y)));
            while (left.length > 0) {
                const connected = this.findAllConnected(coords, left[ 0 ]);
                farms.push(connected);
                left = coords.filter(([ x, y ]) => !farms.some(farm => farm.some(([ fx, fy ]) => fx === x && fy === y)));
            }
            return farms.map(farm => {
                let perimeter = 0;
                for (const [ x, y ] of farm) {
                    const neighbours = [ [ x + 1, y ], [ x - 1, y ], [ x, y + 1 ], [ x, y - 1 ] ];
                    for (const [ nx, ny ] of neighbours) {
                        if (!farm.some(([ fx, fy ]) => fx === nx && fy === ny)) {
                            perimeter++;
                        }
                    }
                }
                return farm.length * perimeter;
            }).reduce((a, b) => a + b, 0);
        }).reduce((a, b) => a + b, 0);
    }
    findAllConnected(coords: number[][], starting: number[]) {
        const connected = [ starting ];
        const queue = [ starting ];
        while (queue.length > 0) {
            const [ x, y ] = queue.pop() as [ number, number ];
            const neighbours = [ [ x + 1, y ], [ x - 1, y ], [ x, y + 1 ], [ x, y - 1 ] ];
            for (const [ nx, ny ] of neighbours) {
                if (coords.some(([ cx, cy ]) => cx === nx && cy === ny)) {
                    if (connected.some(([ cx, cy ]) => cx === nx && cy === ny)) {
                        continue;
                    }
                    connected.push([ nx, ny ]);
                    queue.push([ nx, ny ]);
                }
            }
        }
        return connected;
    }
    secondPart(input: string): (number | string) | Promise<number | string> {
        return "";
    }
}