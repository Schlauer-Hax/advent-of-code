import ISolution from "./ISolution.ts";
import * as mathjs from "mathjs";

export default class S2413 implements ISolution {
    firstPart(input: string): (number | string) | Promise<number | string> {
        const prizes = input.split("\n\n")
            .map(prize => prize.split("\n").map(l => l.split(": ")[ 1 ].split(", ")))
            .map(([ a, b, prize ]) => ({ a: a.map(o => Number(o.slice(1))), b: b.map(o => Number(o.slice(1))), prize: prize.map(p => Number(p.slice(2))) }));
        let sum = 0;
        for (const prize of prizes) {
            const options = [];
            for (let ia = 0; ia < 100; ia++) {
                for (let ib = 0; ib < 100; ib++) {
                    const x = ia * prize.a[ 0 ] + ib * prize.b[ 0 ];
                    const y = ia * prize.a[ 1 ] + ib * prize.b[ 1 ];
                    if (x === prize.prize[ 0 ] && y === prize.prize[ 1 ]) {
                        options.push(ia * 3 + ib);
                    }
                }
            }
            if (options.length !== 0) {
                sum += Math.min(...options);
            }
        }
        return sum;
    }
    secondPart(input: string) {
        const prizes = input.split("\n\n")
            .map(prize => prize.split("\n").map(l => l.split(": ")[ 1 ].split(", ")))
            .map(([ a, b, prize ]) => ({ a: a.map(o => Number(o.slice(1))), b: b.map(o => Number(o.slice(1))), prize: prize.map(p => 10000000000000 + Number(p.slice(2))) }));
        let sum = 0;
        for (const prize of prizes) {
            // prize.a[ 0 ] * x + prize.b[ 0 ] * y = prize.prize[ 0 ]
            // prize.a[ 1 ] * x + prize.b[ 1 ] * y = prize.prize[ 1 ]
            const left = [
                [ prize.a[ 0 ], prize.b[ 0 ] ],  
                [ prize.a[ 1 ], prize.b[ 1 ] ]
            ];

            const right = [
                prize.prize[ 0 ],
                prize.prize[ 1 ]  
            ];

            const solution = mathjs.lusolve(left, right);
            const [ x, y ] = solution.map(x => Number(x[ 0 ]));
            if ((x % 1 < 0.001 || x % 1 > 0.999) && (y % 1 > 0.999 || y % 1 < 0.001)) { // Fuck floating point
                if (x > 0 && y > 0) {
                    sum += Math.round(x) * 3 + Math.round(y);
                }
            }
        }

        return sum;
    }

}