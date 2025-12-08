import ISolution from "./ISolution.ts";

export default class S2506 implements ISolution {
    firstPart(input: string): string | number {
        const out = input.split("\n").map(line => line.split(" ").filter(word => word != ""));
        let sumsum = 0;
        for (let i = 0; i < out[0].length; i++) {
            const operation = out[out.length-1][i];
            let sum = operation === "+" ? 0 : 1;
            for (let j = 0; j < out.length-1; j++) {
                if (operation === "+") {
                    sum += Number(out[j][i]);
                } else {
                    sum *= Number(out[j][i]);
                }
            }
            sumsum += sum;
        }
        return sumsum;
    }

    secondPart(input: string): string | number {
        const out = input.split("\n");
        const indexes = out.at(-1)!.split("").map((operation, index) => [index, operation]).filter(([_, operation]) => operation !== " ") as [number, string][];
        let sumsum = 0;
        for (const [index, operation] of indexes) {
            let sum = operation === "+" ? 0 : 1;
            let i = index;
            while (!out.every(line => line.split("")[i] === " ")) {
                let numberstr = "";
                for (let j = 0; j < out.length-1; j++) {
                    const char = out[j].split("")[i];
                    if (char !== " ") {
                        numberstr += char;
                    }
                }
                const number = Number(numberstr);
                if (isNaN(number)) {
                    break;
                }
                if (operation === "+") {
                    sum += number;
                } else {
                    sum *= number;
                }
                i++;
            }
            sumsum += sum;
        }
        return sumsum;
    }
}