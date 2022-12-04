import ISolution from "./ISolution.ts";

export default class S2201 implements ISolution {
    firstPart(input: string): number {
        return Math.max(...input.split("\n\n").map(inventory => inventory.split("\n").map(Number).reduce((a, b) => a + b)))
    }
    secondPart(input: string): number {
        return input.split("\n\n").map(inventory => inventory.split("\n").map(Number).reduce((a, b) => a + b)).sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a + b);
    }
}