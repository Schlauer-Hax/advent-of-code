import ISolution from "./ISolution.ts";

export default class S2502 implements ISolution {
    firstPart(input: string): string | number {
        return input.split("\n").map(line => {
            let highest = 0;
            line.split("").forEach((num1, idx1, arr) => {
                arr.forEach((num2, idx2) => {
                    if (idx1 !== idx2 && idx1 < idx2) {
                        if (Number(num1 + num2) > highest) {
                            highest = Number(num1 + num2);
                        }
                    }
                })
            })
            return highest;
        }).reduce((a, b) => a + b, 0);
    }
    secondPart(input: string): string | number {
        return input.split("\n").map(line => {
            let highest = 0;
            const numbers = line.split("");
            for (const [num1, rem1] of this.selectBiggest(numbers, 11)) {
                for (const [num2, rem2] of this.selectBiggest(rem1, 10)) {
                    for (const [num3, rem3] of this.selectBiggest(rem2, 9)) {
                        for (const [num4, rem4] of this.selectBiggest(rem3, 8)) {
                            for (const [num5, rem5] of this.selectBiggest(rem4, 7)) {
                                for (const [num6, rem6] of this.selectBiggest(rem5, 6)) {
                                    for (const [num7, rem7] of this.selectBiggest(rem6, 5)) {
                                        for (const [num8, rem8] of this.selectBiggest(rem7, 4)) {
                                            for (const [num9, rem9] of this.selectBiggest(rem8, 3)) {
                                                for (const [num10, rem10] of this.selectBiggest(rem9, 2)) {
                                                    for (const [num11, rem11] of this.selectBiggest(rem10, 1)) {
                                                        for (const [num12] of this.selectBiggest(rem11, 0)) {
                                                            const candidate = num1 + num2 + num3 + num4 + num5 + num6 + num7 + num8 + num9 + num10 + num11 + num12;
                                                            if (Number(candidate) > highest) {
                                                                highest = Number(candidate);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return highest;
        }).reduce((a, b) => a + b, 0);
    }
    *selectBiggest(arr: string[], mustLeave: number): Generator<[string, string[]]> {
        if (arr.length <= mustLeave) {
            yield ["", arr];
        }
        let biggest = 0;
        let biggestIndex = -1;
        for (let i = 0; i < arr.length-mustLeave; i++) {
            const current = arr[i];
            if (Number(current) > biggest) {
                biggest = Number(current);
                biggestIndex = i;
            }
        }
        if (biggestIndex !== -1) {
            yield [arr[biggestIndex], arr.slice(biggestIndex + 1)];
        }
    }
}