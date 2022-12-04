import ISolution from './solutions/ISolution.ts';
import S2101 from './solutions/S2101.ts';
import S2102 from './solutions/S2102.ts';
import S2103 from './solutions/S2103.ts';
import S2104 from './solutions/S2104.ts';
import S2105 from './solutions/S2105.ts';
import S2106 from './solutions/S2106.ts';
import S2107 from './solutions/S2107.ts';
import S2108 from './solutions/S2108.ts';
import S2109 from './solutions/S2109.ts';
import S2110 from './solutions/S2110.ts';
import S2201 from './solutions/S2201.ts';
import S2202 from './solutions/S2202.ts';
import S2203 from './solutions/S2203.ts';
import S2204 from './solutions/S2204.ts';

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
    new S2110(),
    new S2201(),
    new S2202(),
    new S2203(),
    new S2204(),
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