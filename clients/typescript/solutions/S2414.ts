import ISolution from "./ISolution.ts";
import { createCanvas } from "https://deno.land/x/canvas@v1.4.2/mod.ts";

export default class S2414 implements ISolution {
    firstPart(input: string): (number | string) | Promise<number | string> {
        const robots = input.split("\n").map(x => x.split(" ").map(y => y.split("=")[ 1 ])).map((([ p, v ]) => ({ p: p.split(",").map(Number), v: v.split(",").map(Number) })));
        let sizex = 101;
        let sizey = 103;
        if (robots.length < 15) {
            sizex = 11;
            sizey = 7;
        }
        const finished: Record<string, number> = {};
        for (const { p, v } of robots) {
            for (let i = 0; i < 100; i++) {
                p[ 0 ] += v[ 0 ];
                p[ 1 ] += v[ 1 ];
                if (p[ 0 ] >= sizex) {
                    p[ 0 ] = p[ 0 ] - sizex;
                }
                if (p[ 1 ] >= sizey) {
                    p[ 1 ] = p[ 1 ] - sizey;
                }
                if (p[ 0 ] < 0) {
                    p[ 0 ] = sizex + p[ 0 ];
                }
                if (p[ 1 ] < 0) {
                    p[ 1 ] = sizey + p[ 1 ];
                }
            }
            finished[ p.join(",") ] = finished[ p.join(",") ] ? finished[ p.join(",") ] + 1 : 1;
        }
        const endx = Math.floor(sizex / 2) - 1;
        const endy = Math.floor(sizey / 2) - 1;

        const quadrants = [
            [ 0, 0, endx, endy ],
            [ endx + 2, 0, sizex - 1, endy ],
            [ 0, endy + 2, endx, sizey - 1 ],
            [ endx + 2, endy + 2, sizex - 1, sizey - 1 ]
        ]
        return quadrants.map(quadrant => {
            return Object.entries(finished).filter(([ k, v ]) => {
                const [ x, y ] = k.split(",").map(Number);
                return x >= quadrant[ 0 ] && x <= quadrant[ 2 ] && y >= quadrant[ 1 ] && y <= quadrant[ 3 ];
            }).map(([ k, v ]) => v).reduce((a, b) => a + b, 0);
        }).reduce((a, b) => a * b, 1);
    }
    secondPart(input: string): number | string {
        const robots = input.split("\n").map(x => x.split(" ").map(y => y.split("=")[ 1 ])).map((([ p, v ]) => ({ p: p.split(",").map(Number), v: v.split(",").map(Number) })));
        let sizex = 101;
        let sizey = 103;
        if (robots.length < 15) {
            sizex = 11;
            sizey = 7;
        }
        for (let i = 0; i < 10000; i++) {
            const finished: Record<string, number> = {};

            for (const { p, v } of robots) {
                p[ 0 ] += v[ 0 ];
                p[ 1 ] += v[ 1 ];
                if (p[ 0 ] >= sizex) {
                    p[ 0 ] = p[ 0 ] - sizex;
                }
                if (p[ 1 ] >= sizey) {
                    p[ 1 ] = p[ 1 ] - sizey;
                }
                if (p[ 0 ] < 0) {
                    p[ 0 ] = sizex + p[ 0 ];
                }
                if (p[ 1 ] < 0) {
                    p[ 1 ] = sizey + p[ 1 ];
                }
                finished[ p.join(",") ] = finished[ p.join(",") ] ? finished[ p.join(",") ] + 1 : 1;
            }
            for (let y = 0; y < sizey; y++) {
                let line = "";
                for (let x = 0; x < sizex; x++) {
                    line += finished[ x + "," + y ] ? "#" : ".";
                }
                if (line.includes("########################")) {
                    return i+1;
                }
            }
            
                // const canvas = createCanvas(sizex, sizey);
                // const ctx = canvas.getContext("2d");
                // ctx.fillStyle = "black";
                // ctx.fillRect(0, 0, sizex, sizey);
                // ctx.fillStyle = "white";
                // for (const [k, v] of Object.entries(finished)) {
                //     const [x, y] = k.split(",").map(Number);
                //     ctx.fillRect(x, y, 1, 1);
                // }
                // Deno.writeFileSync("output/"+i+".png", canvas.toBuffer());
        }
        return 0;
    }

}