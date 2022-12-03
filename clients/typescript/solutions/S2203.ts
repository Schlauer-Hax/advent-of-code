import ISolution from "./ISolution.ts";

export default class S2203 implements ISolution {
    name = "S2203";
    firstPart(input: string): number {
        return input.split('\n').map(line => line.slice(0, line.length / 2).split('').find(letter => line.slice(line.length / 2).includes(letter))).map(letter => letter!.charCodeAt(0) - (letter?.toLowerCase() === letter ? 96 : 64 - 26)).reduce((a, b) => a + b, 0);
    }
    secondPart(input: string): number {
        let sum = 0;
        for (let i = 0; i < input.split('\n').length; i += 3) {
            const letter = input.split('\n')[i].split('').find(letter => input.split('\n')[i + 1].includes(letter) && input.split('\n')[i + 2].includes(letter))!;
            const priority = letter!.charCodeAt(0) - (letter?.toLowerCase() === letter ? 96 : 64 - 26)
            sum += priority;
        }
        return sum;
    }
}