import ISolution from "./ISolution.ts";

export default class S2204 implements ISolution {
    firstPart(input: string): number {

        return input
            .split('\n')
            .map(line =>
                line.split(',').map(elve =>
                    elve.split('-').map(Number)
                ))
            .filter(elves =>
                elves[0][0] <= elves[1][0] && elves[0][1] >= elves[1][1] ||
                elves[0][0] >= elves[1][0] && elves[0][1] <= elves[1][1]
            ).length
    }
    secondPart(input: string): number {
        return input.split('\n')
            .map(line =>
                line.split(',').map(elve =>
                    elve.split('-').map(Number)
                ))
            .filter(elves =>
                elves[0][0] <= elves[1][0] && elves[0][1] >= elves[1][0] ||
                elves[0][0] <= elves[1][1] && elves[0][1] >= elves[1][1] ||
                elves[0][0] >= elves[1][0] && elves[0][1] <= elves[1][1] ||
                elves[0][0] <= elves[1][0] && elves[0][1] >= elves[1][1]
            ).length
    }
}