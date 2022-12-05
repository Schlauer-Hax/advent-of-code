import ISolution from './solutions/ISolution.ts';

export class Runner {
    list: [name: string, solution: ISolution][] = [];
    async loadSolutions() {
        this.list = (await Promise.all(Array.from(Deno.readDirSync('./solutions')).filter(file => file.name.startsWith('S')).map(async file => [file.name.replace('.ts', ''), new (await import('./solutions/' + file.name)).default()] as [string, ISolution])));
    }
    run(name: string, input: string) {
        const solution = this.list.find(s => s[0] === name);
        if (solution) {
            return [solution[1].firstPart(input), solution[1].secondPart(input)];
        }
        return [0, 0];
    }

    getSolutions() {
        return this.list.map(s => s[0]);
    }
}

export default Runner;