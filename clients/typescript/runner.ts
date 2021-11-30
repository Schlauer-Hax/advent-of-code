import ISolution from './solutions/ISolution';
import S2101 from './solutions/S2101';

const list: ISolution[] = [
    new S2101(),

]

export class Runner {
    run(name: string, input: string): [string, string] {
        const solution = list.find(s => s.name === name);
        if (solution) {
            return [solution.firstPart(input), solution.secondPart(input)];
        }
        return ["", ""];
    }

    getSolutions() {
        return list.map(s => s.name);
    }
}

export default Runner;