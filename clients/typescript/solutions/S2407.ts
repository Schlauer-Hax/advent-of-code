import ISolution from "./ISolution.ts";

export default class S2407 implements ISolution {
    firstPart(input: string): (number | string) | Promise<number | string> {
        const lines = input.split("\n").map(line => line.split(": "));
        function tryNumbers(numbers: number[], results: number[]) {
            if (numbers.length === 0) {
                return results;
            }
            return tryNumbers(numbers.slice(1), results.map(res => ([
                res * numbers[ 0 ],
                res + numbers[ 0 ]
            ])).flat());
        }
        return lines.map(([ needed, numbersraw ]) =>
            tryNumbers(numbersraw.split(" ").map(Number), [ 0 ]).filter(n => n === Number(needed))
        ).filter(n => n.length > 0).map(n => n[ 0 ]).reduce((a, b) => a + b, 0);
    }
    secondPart(input: string): (number | string) | Promise<number | string> {
        const lines = input.split("\n").map(line => line.split(": "));
        function tryNumbers(numbers: number[], results: number[]) {
            if (numbers.length === 0) {
                return results;
            }
            return tryNumbers(numbers.slice(1), results.map(res => ([
                res * numbers[ 0 ],
                res + numbers[ 0 ],
                Number(String(res) + String(numbers[ 0 ]))
            ])).flat());
        }
        return lines.map(([ needed, numbersraw ]) =>
            tryNumbers(numbersraw.split(" ").map(Number), [ 0 ]).filter(n => n === Number(needed))
        ).filter(n => n.length > 0).map(n => n[ 0 ]).reduce((a, b) => a + b, 0);
    }

}