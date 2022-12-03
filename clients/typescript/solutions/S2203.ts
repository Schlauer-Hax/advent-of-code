import ISolution from "./ISolution.ts";

export default class S2203 implements ISolution {
    name = "S2203";
    firstPart(input: string): number {
        return input.split('\n').map(line => line.slice(0, line.length / 2).split('').find(letter => line.slice(line.length / 2).includes(letter))).map(letter => letter!.charCodeAt(0) - (letter?.toLowerCase() === letter ? 96 : 64 - 26)).reduce((a, b) => a + b, 0);
    }
    secondPart(input: string): number {
        return Array(input.split('\n').length / 3).fill(0).map((_, i) => input.split('\n')[i * 3].split('').find(letter => input.split('\n')[i * 3 + 1].includes(letter) && input.split('\n')[i * 3 + 2].includes(letter))!).map(letter => letter!.charCodeAt(0) - (letter?.toLowerCase() === letter ? 96 : 64 - 26)).reduce((a, b) => a + b, 0);
    }
}