import ISolution from './solutions/ISolution';
import S2101 from './solutions/S2101';
import S2102 from './solutions/S2102';

const list: ISolution[] = [
    new S2101(),
    new S2102()
]

export class Runner {
    run(name: string, input: string): [number, number] {
        const solution = list.find(s => s.name === name);
        if (solution) {
            return [solution.firstPart(input), solution.secondPart(input)];
        }
        return [0, 0];
    }

    getSolutions() {
        return list.map(s => s.name);
    }
}

export default Runner;