import ISolution from "./ISolution.ts";

export default class S2410 implements ISolution {
    firstPart(input: string): (number | string) | Promise<number | string> {
        const numbers = input.split("\n").map(line => line.split("").map(Number));
        const zeros = numbers.map((line, y) => line.map((a, x) => [ a, x ]).filter(a => a[ 0 ] === 0).map(a => [ a[ 1 ], y ])).flat();
        return zeros.map(zero =>
            this.step([ zero[ 0 ], zero[ 1 ] ], 1, numbers)
                .filter((x, i, arr) => arr.findIndex(y => y[ 0 ] === x[ 0 ] && y[ 1 ] === x[ 1 ]) === i).length
        ).reduce((acc, val) => acc + val, 0);
    }
    secondPart(input: string): (number | string) | Promise<number | string> {
        const numbers = input.split("\n").map(line => line.split("").map(Number));
        const zeros = numbers.map((line, y) => line.map((a, x) => [ a, x ]).filter(a => a[ 0 ] === 0).map(a => [ a[ 1 ], y ])).flat();
        return zeros.map(zero =>
            this.step([ zero[ 0 ], zero[ 1 ] ], 1, numbers).length
        ).reduce((acc, val) => acc + val, 0);
    }

    step(pos: [ number, number ], number: number, numbers: number[][]): [ number, number ][] {
        if (number === 10) {
            return [ pos ];
        }
        return [
            pos[ 1 ] - 1 >= 0 ? [ pos[ 0 ], pos[ 1 ] - 1, numbers[ pos[ 1 ] - 1 ][ pos[ 0 ] ] ] : [ -1, -1, -1 ],
            pos[ 1 ] + 1 < numbers.length ? [ pos[ 0 ], pos[ 1 ] + 1, numbers[ pos[ 1 ] + 1 ][ pos[ 0 ] ] ] : [ -1, -1, -1 ],
            pos[ 0 ] - 1 >= 0 ? [ pos[ 0 ] - 1, pos[ 1 ], numbers[ pos[ 1 ] ][ pos[ 0 ] - 1 ] ] : [ -1, -1, -1 ],
            pos[ 0 ] + 1 < numbers[ 0 ].length ? [ pos[ 0 ] + 1, pos[ 1 ], numbers[ pos[ 1 ] ][ pos[ 0 ] + 1 ] ] : [ -1, -1, -1 ]
        ]
            .filter(x => x[ 2 ] === number)
            .map(x => this.step([ x[ 0 ], x[ 1 ] ], number + 1, numbers))
            .flat();
    }

}