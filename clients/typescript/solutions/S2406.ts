import ISolution from "./ISolution.ts";
import routine from "https://deno.land/x/routine/mod.ts";

export default class S2406 implements ISolution {
    firstPart(input: string): (number | string) | Promise<number | string> {
        const coords = input.split("\n").map(line => line.split(""));
        const currentPos = { x: 0, y: 0 };
        let direction = "up";
        for (const y in coords) {
            for (const x in coords[ y ]) {
                if (coords[ y ][ x ] === "^") {
                    currentPos.x = Number(x);
                    currentPos.y = Number(y);
                }
            }
        }
        const poss: {x: number, y: number}[] = [];
        poss.push({ x: currentPos.x, y: currentPos.y });
        walk: while (true) {
            switch (direction) {
                case "up":
                    if (!coords[ currentPos.y - 1 ]) {
                        break walk;
                    }
                    if (coords[ currentPos.y - 1 ][ currentPos.x ] === "#") {
                        direction = "right";

                    } else {
                        currentPos.y--;
                        poss.push({ x: currentPos.x, y: currentPos.y });
                    }
                    break;
                case "right":
                    if (!coords[ currentPos.y ][ currentPos.x + 1 ]) {
                        break walk;
                    }
                    if (coords[ currentPos.y ][ currentPos.x + 1 ] === "#") {
                        direction = "down";

                    } else {
                        currentPos.x++;
                        poss.push({ x: currentPos.x, y: currentPos.y });
                    }
                    break;
                case "down":
                    if (!coords[ currentPos.y + 1 ]) {
                        break walk;
                    }
                    if (coords[ currentPos.y + 1 ][ currentPos.x ] === "#") {
                        direction = "left";
                    } else {
                        currentPos.y++;
                        poss.push({ x: currentPos.x, y: currentPos.y });
                    }
                    break;
                case "left":
                    if (!coords[ currentPos.y ][ currentPos.x - 1 ]) {
                        break walk;
                    }
                    if (coords[ currentPos.y ][ currentPos.x - 1 ] === "#") {
                        direction = "up";
                    } else {
                        currentPos.x--;
                        poss.push({ x: currentPos.x, y: currentPos.y });
                    }
                    break;

            }
        }
        return poss.filter((pos, index) => poss.findIndex(p => p.x === pos.x && p.y === pos.y) === index).length;
    }
    async secondPart(input: string): Promise<string | number> {
        const coords = input.split("\n").map(line => line.split(""));
        function tryWith(coords: string[][]): number {
            const poss: {x: number, y: number}[] = [];
            let direction = "up";
            const currentPos = { x: 0, y: 0 };
            for (const y in coords) {
                for (const x in coords[ y ]) {
                    if (coords[ y ][ x ] === "^") {
                        currentPos.x = Number(x);
                        currentPos.y = Number(y);
                    }
                }
            }
            poss.push({ x: currentPos.x, y: currentPos.y });
            walk: while (true) {
                if (poss.length - poss.filter((pos, index) => poss.findIndex(p => p.x === pos.x && p.y === pos.y) === index).length > coords.length * coords[ 0 ].length) {
                    console.log("probably infinite loop");
                    return 1;
                }
                switch (direction) {
                    case "up":
                        if (!coords[ currentPos.y - 1 ]) {
                            break walk;
                        }
                        if (coords[ currentPos.y - 1 ][ currentPos.x ] === "#") {
                            direction = "right";
                        } else {
                            currentPos.y--;
                            poss.push({ x: currentPos.x, y: currentPos.y });
                        }
                        break;
                    case "right":
                        if (!coords[ currentPos.y ][ currentPos.x + 1 ]) {
                            break walk;
                        }
                        if (coords[ currentPos.y ][ currentPos.x + 1 ] === "#") {
                            direction = "down";
                        } else {
                            currentPos.x++;
                            poss.push({ x: currentPos.x, y: currentPos.y });
                        }
                        break;
                    case "down":
                        if (!coords[ currentPos.y + 1 ]) {
                            break walk;
                        }
                        if (coords[ currentPos.y + 1 ][ currentPos.x ] === "#") {
                            direction = "left";
                        } else {
                            currentPos.y++;
                            poss.push({ x: currentPos.x, y: currentPos.y });
                        }
                        break;
                    case "left":
                        if (!coords[ currentPos.y ][ currentPos.x - 1 ]) {
                            break walk;
                        }
                        if (coords[ currentPos.y ][ currentPos.x - 1 ] === "#") {
                            direction = "up";
                        } else {
                            currentPos.x--;
                            poss.push({ x: currentPos.x, y: currentPos.y });
                        }
                        break;

                }
            }
            return 0;
        }
        const routines = [];
        for (const y in coords) {
            for (const x in coords[ y ]) {
                if (coords[ y ][ x ] === ".") {
                    coords[ y ][ x ] = "#";
                    routines.push(routine(tryWith, coords));
                    coords[ y ][ x ] = ".";
                }
            }
        }
        return await Promise.all(routines).then(res => res.reduce((a, b) => a + b, 0));
    }
}