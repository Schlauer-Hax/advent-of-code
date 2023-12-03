import ISolution from "./ISolution.ts";

export default class S2303 implements ISolution {
    firstPart(input: string): string | number {
        return input.split('\n')
            .map((line, index, lines) =>
                [...line.matchAll(/[0-9]+/g)].filter((val) =>
                    [lines[index - 1], line, lines[index + 1]].some(s =>
                        s?.substring(val.index! - 1, val.index! + val[0].length + 1)
                            .match(/[^0-9.]/g))
                ).map(s => Number(s[0])))
            .flat()
            .reduce((a, b) => a + b, 0);
    }
    secondPart(input: string): string | number {
        return input.split('\n')
            .map((line, index, lines) =>
                [...line.matchAll(/\*/g)].map((val) =>
                    [lines[index - 1], line, lines[index + 1]]
                        .map(s => [...s.matchAll(/[0-9]+/g)]
                            .filter((match) => !(match.index! > val.index! + 1 || match.index! + match[0].length < val.index!))
                            .map(s => Number(s[0])))
                        .flat()
                        .map((item, _, arr) => arr.length === 2 ? item : 0)
                        .reduce((a, b) => a * b)
                ))
            .flat()
            .reduce((a, b) => a + b, 0);
    }
}