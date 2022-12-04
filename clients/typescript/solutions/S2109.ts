import ISolution from "./ISolution.ts";

export default class S2109 implements ISolution {
    firstPart(input: string): number {
        return input.split('\n').map(line => line.split('').map(Number)).map((line, linesindex, lines) => line.filter((number, index, array) =>
            number < (array[index - 1] !== undefined ? array[index - 1] : 10) &&
            number < (array[index + 1] !== undefined ? array[index + 1] : 10) &&
            number < ((lines[linesindex - 1] || [])[index] !== undefined ? (lines[linesindex - 1] || [])[index] : 10) &&
            number < ((lines[linesindex + 1] || [])[index] !== undefined ? (lines[linesindex + 1] || [])[index] : 10)
        )).reduce((a, b) => [...a, ...b], []).map(number => number + 1).reduce((a, b) => a + b, 0);
    }
    secondPart(_input: string): number {
        return 0;
    }
}