import ISolution from "./ISolution.ts";

export default class S2402 implements ISolution {
    firstPart(input: string): (number | string) | Promise<number | string> {
        const lines = input.split("\n").map((x) => x.split(" ").map(Number)).filter((x) => x.length > 1);
        let sum = 0;
        for (const line of lines) {
            const differences = [];
            for (let i = 1; i < line.length; i++) {
                differences.push(line[ i ] - line[ i - 1 ]);
            }
            if (differences.every((x) => x < 0 && x > -4) || differences.every((x) => x > 0 && x < 4)) {
                sum++;
            }
        }

        return sum;
    }
    secondPart(input: string): (number | string) | Promise<number | string> {
        const lines = input.split("\n").map((x) => x.split(" ").map(Number)).filter((x) => x.length > 1);
        let sum = 0;
        for (const line of lines) {
            const differences = [];
            for (let i = 1; i < line.length; i++) {
                differences.push(line[ i ] - line[ i - 1 ]);
            }
            if (differences.every((x) => x < 0 && x > -4) || differences.every((x) => x > 0 && x < 4)) {
                sum++;
                continue;
            }
            for (let i = 0; i < line.length; i++) {
                const newline = line.slice(0, i).concat(line.slice(i + 1));
                const differences = [];
                for (let i = 1; i < newline.length; i++) {
                    differences.push(newline[ i ] - newline[ i - 1 ]);
                }
                if (differences.every((x) => x < 0 && x > -4) || differences.every((x) => x > 0 && x < 4)) {
                    sum++;
                    break;
                }
            }
        }
        return sum;
    }
}
