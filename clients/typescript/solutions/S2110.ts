import ISolution from "./ISolution.ts";

export default class S2110 implements ISolution {
    name = "S2110";
    firstPart(input: string): number {
        const charmap = {
            '(': ')',
            '{': '}',
            '[': ']',
            '<': '>'
        } as { [key: string]: string };

        const lines = input.split('\n').map(line => line.split(''));
        const results = lines.map(line => {
            let expected = [] as string[];
            for (const letter of line) {
                if (Object.keys(charmap).includes(letter)) {
                    expected.push(charmap[letter]);
                } else {
                    if (letter !== expected[expected.length - 1]) {
                        return letter;
                    } else {
                        expected = expected.slice(0, expected.length - 1);
                    }
                }
            }
        })
        const pointsTable = {
            ')': 3,
            ']': 57,
            '}': 1197,
            '>': 25137
        } as { [key: string]: number }
        return results.filter(val => val).reduce((a, b) => a + pointsTable[b!], 0);
    }
    secondPart(input: string): number {
        const charmap = {
            '(': ')',
            '{': '}',
            '[': ']',
            '<': '>'
        } as { [key: string]: string };

        const lines = input.split('\n').map(line => line.split(''));
        const results = lines.map(line => {
            let expected = [] as string[];
            for (const letter of line) {
                if (Object.keys(charmap).includes(letter)) {
                    expected.push(charmap[letter]);
                } else {
                    if (letter !== expected[expected.length - 1]) {
                        return undefined;
                    } else {
                        expected = expected.slice(0, expected.length - 1);
                    }
                }
            }
            return expected.reverse();
        })
        const pointsTable = {
            ')': 1,
            ']': 2,
            '}': 3,
            '>': 4
        } as { [key: string]: number }
        const answ = results.filter(val => val).map(line => line?.reduce((a, b) => a * 5 + pointsTable[b], 0)).sort((a,b) => a! - b!) as number[];
        return answ[Math.floor(answ.length/2)];
    }

}