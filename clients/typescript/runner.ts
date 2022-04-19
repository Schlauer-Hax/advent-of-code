import ISolution from './solutions/ISolution';
import S2101 from './solutions/S2101';
import S2102 from './solutions/S2102';
import S2103 from './solutions/S2103';
import S2104 from './solutions/S2104';
import S2105 from './solutions/S2105';
import S2106 from './solutions/S2106';
import S2107 from './solutions/S2107';
import S2108 from './solutions/S2108';
import S2109 from './solutions/S2109';

const list: ISolution[] = [
    new S2101(),
    new S2102(),
    new S2103(),
    new S2104(),
    new S2105(),
    new S2106(),
    new S2107(),
    new S2108(),
    new S2109(),
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