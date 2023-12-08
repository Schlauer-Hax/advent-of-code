import ISolution from "./ISolution.ts";

export default class S2303 implements ISolution {
    firstPart(input: string): string | number {
        const list = input.split('\n');
        const lr = list[0].split('');
        const instructions: Record<string, [string, string]> = {}
        list.slice(2).forEach(item => {
            const [key, val] = item.split(' = ');
            instructions[key] = val.replace('(', '').replace(')', '').split(', ') as [string, string];
        })
        let pos = "AAA";
        let steps = 0;
        while (pos !== "ZZZ") {
            for (const step of lr) {
                pos = instructions[pos][step === "L" ? 0 : 1];
                steps++;
            }
        }
        return steps;
    }
    secondPart(input: string): string | number {
        const list = input.split('\n');
        const lr = list[0].split('');
        const instructions: Record<string, [string, string]> = {}
        list.slice(2).forEach(item => {
            const [key, val] = item.split(' = ');
            instructions[key] = val.replace('(', '').replace(')', '').split(', ') as [string, string];
        })
        const positions = Object.keys(instructions).filter(key => key.endsWith("A"));
        const steps = positions.map(pos => {
            let steps = 0;
            while (!pos.endsWith("Z")) {
                for (const step of lr) {
                    pos = instructions[pos][step === "L" ? 0 : 1];
                    steps++;
                }
            }
            return steps;
        });
        // https://stackoverflow.com/questions/31302054/how-to-find-the-least-common-multiple-of-a-range-of-numbers
        const gcd: (a:number, b:number) => number = (a, b) => b == 0 ? a : gcd(b, a % b)
        const lcm = (a: number, b: number) => a / gcd(a, b) * b
        const lcmAll = (ns: number[]) => ns.reduce(lcm, 1)
        // Why does that work? That shouldnt work.
        return lcmAll(steps);
    }

}