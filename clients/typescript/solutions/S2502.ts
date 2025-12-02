import ISolution from "./ISolution.ts";

export default class S2502 implements ISolution {
    firstPart(input: string): string | number {
        let sum = 0;
        input.split(",").map(x => x.split("-").map(Number)).forEach(([from, to]) => {
            for (let i = from; i <= to; i++) {
                if (i.toString().length % 2 === 0 && i.toString().slice(0, i.toString().length / 2) === i.toString().slice(i.toString().length / 2)) {
                    sum += i;
                }
            }
        })
        return sum;
    }
    secondPart(input: string): string | number {
        let sum = 0;
        input.split(",").map(x => x.split("-").map(Number)).forEach(([from, to]) => {
            for (let i = from; i <= to; i++) {
                for (let j = 1; j <= 9; j++) {
                    if (i.toString().length % j === 0) {
                        const parts: string[] = [];
                        for (let k = 0; k < i.toString().length; k += j) {
                            parts.push(i.toString().slice(k, k + j));
                        }
                        if (parts.every(p => p === parts[0]) && parts.length > 1) {
                            sum += i;
                            break;
                        }
                    }
                }
            }
        })
        return sum;
    }
}