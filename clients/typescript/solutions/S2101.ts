import ISolution from "./ISolution.ts";

export default class S2101 implements ISolution {
    firstPart(input: string): number {
        return (input.split('\n').filter((line, index, lines) => Number(line) > Number(lines[index - 1])).length)
    }
    secondPart(input: string): number {
        return (input.split('\n').filter((line, index, lines) => {
            return (index + 3 === lines.length) ? false : Number(lines[index + 1]) + Number(lines[index + 2]) + Number(lines[index + 3]) > Number(line) + Number(lines[index + 1]) + Number(lines[index + 2])
        }).length)
    }
}