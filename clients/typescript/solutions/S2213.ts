import ISolution from './ISolution.ts';

export default class S2213 implements ISolution {
    firstPart(input: string): string | number {
        return input
            .split('\n\n')
            .map((pair, i) => [this.compareArrays(pair.split('\n').map(packet => JSON.parse(packet))), i])
            .filter(([val]) => val)
            .map(([_, i]) => Number(i))
            .reduce((a, b) => a + b + 1, 0);
    }
    secondPart(input: string): string | number {
        const pairs = input.split('\n\n').map(pair => pair.split('\n').map(packet => JSON.parse(packet))).concat([[[[2]]], [[[6]]]]).reduce((a, b) => a.concat(b), []);
        const findDivider = (number: number) => pairs.findIndex(val => val[0] && val[0][0] && val[0][0] === number);
        const correctOrder = () => pairs.slice(0, -1).map((val, i) => this.compareArrays([copyArray(val), copyArray(pairs[i + 1])])).every(val => val);
        const copyArray = (array: any[]): any[] => array.map(val => Array.isArray(val) ? copyArray(val) : val);
        while (!correctOrder()) {
            for (let i = 0; i < pairs.length - 1; i++) {
                if (!this.compareArrays([copyArray(pairs[i]), copyArray(pairs[i + 1])])) {
                    const temp = pairs[i];
                    pairs[i] = pairs[i + 1];
                    pairs[i + 1] = temp;
                }
            }
        }
        return (findDivider(2) + 1) * (findDivider(6) + 1);
    }
    compareArrays(pair: any[][]): boolean | undefined {
        for (let i = 0; i < Math.max(pair[0].length, pair[1].length); i++) {
            if (pair[0][i] === undefined) {
                return true; // corrent order when left side runs out of packets
            }
            if (pair[1][i] === undefined) {
                return false; // wrong order when right side runs out of packets
            }
            if (typeof pair[0][i] === 'number' && typeof pair[1][i] === 'object') {
                pair[0][i] = [pair[0][i]];
            }
            if (typeof pair[1][i] === 'number' && typeof pair[0][i] === 'object') {
                pair[1][i] = [pair[1][i]];
            }
            if (typeof pair[0][i] === typeof pair[1][i]) {
                if (typeof pair[0][i] === 'number') {
                    if (pair[0][i] < pair[1][i]) {
                        return true; // correct order when left side has smaller number
                    } else if (pair[0][i] > pair[1][i]) {
                        return false; // wrong order when left side has bigger number
                    }
                } else if (typeof pair[0][i] === 'object') {
                    const res = this.compareArrays([pair[0][i], pair[1][i]]);
                    if (res !== undefined) {
                        return res;
                    }
                }
            }
        }
    }
}