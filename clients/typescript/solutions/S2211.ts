import ISolution from './ISolution.ts';

export default class S2211 implements ISolution {
    firstPart(input: string): string | number {
        const monkeys = this.data(input);
        for (let i = 0; i < 20; i++) {
            for (const monkey of monkeys) {
                [...monkey.items].forEach((item) => {
                    monkey.inspects++;
                    eval(monkey.operation);
                    item = Math.floor(item / 3);
                    monkeys[item % monkey.divisor === 0 ? monkey.truemonkey : monkey.falsemonkey].items.push(item);
                });
                monkey.items = [];
            }
        }
        return monkeys.map(monkey => monkey.inspects).sort((a, b) => b - a).slice(0, 2).reduce((a, b) => a * b, 1);
    }
    secondPart(input: string): string | number {
        const monkeys = this.data(input);
        const factor = monkeys.reduce((acc, { divisor }) => acc * divisor, 1);
        for (let i = 0; i < 10000; i++) {
            for (const monkey of monkeys) {
                [...monkey.items].forEach((item) => {
                    monkey.inspects++;
                    eval(monkey.operation);
                    monkeys[item % monkey.divisor === 0 ? monkey.truemonkey : monkey.falsemonkey].items.push(item % factor);
                });
                monkey.items = [];
            }
        }
        return monkeys.map(monkey => monkey.inspects).sort((a, b) => b - a).slice(0, 2).reduce((a, b) => a * b, 1);
    }
    data(input: string) {
        return (input.split('\n').map((_, index, arr) => arr.slice(index, index + 6))).filter(([line]) => line.startsWith('Monkey')).map((lines) => {
            return {
                monkey: Number(lines[0].split(' ')[1].replace(':', '')),
                items: lines[1].split(': ')[1].split(', ').map(Number),
                operation: lines[2].split(': ')[1].replace('new', `item`).replaceAll('old', 'item'),
                divisor: Number(lines[3].split('by ')[1]),
                truemonkey: Number(lines[4].split('monkey ')[1]),
                falsemonkey: Number(lines[5].split('monkey ')[1]),
                inspects: 0
            }
        });
    }
}