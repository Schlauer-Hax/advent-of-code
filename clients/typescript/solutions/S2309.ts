import ISolution from "./ISolution.ts";

export default class S2309 implements ISolution {
    firstPart(input: string): string | number {
        return input.split('\n').map(history => {
            const changes = [history.split(' ').map(Number)];
            while (!changes.at(-1)!.every(x => x === 0)) {
                const changemap = [];
                for (let i = 0; i < changes.at(-1)!.length - 1; i++) {
                    changemap.push(changes.at(-1)![i + 1] - changes.at(-1)![i]);
                }
                changes.push(changemap);
            }
            changes.at(-1)!.push(0);
            for (let i = -2; i >= -changes.length; i--) {
                changes.at(i)!.push(changes.at(i)!.at(-1)! + changes.at(i + 1)!.at(-1)!);
            }
            return changes[0].at(-1)!
        }).reduce((a, b) => a + b, 0);
    }
    secondPart(input: string): string | number {
        return input.split('\n').map(history => {
            const changes = [history.split(' ').map(Number)];
            while (!changes.at(-1)!.every(x => x === 0)) {
                const changemap = [];
                for (let i = 0; i < changes.at(-1)!.length - 1; i++) {
                    changemap.push(changes.at(-1)![i + 1] - changes.at(-1)![i]);
                }
                changes.push(changemap);
            }
            changes.at(-1)!.unshift(0);
            for (let i = -2; i >= -changes.length; i--) {
                changes.at(i)!.unshift(changes.at(i)![0] - changes.at(i+1)![0]);
            }
            return changes[0][0];
        }).reduce((a, b) => a + b, 0);
    }
}