import ISolution from './ISolution.ts';

export default class S2212 implements ISolution {
    firstPart(input: string): string | number {
        const { distances, start } = this.getData(input);
        return distances[start[1]][start[0]];
    }
    secondPart(input: string): string | number {
        const { rows, distances } = this.getData(input);
        return rows.map((row, y) => row.filter(val => val === 0).map(val => distances[y][row.indexOf(val)]).filter(val => val !== undefined)).reduce((a, b) => a.concat(b), []).sort((a, b) => a - b)[0];
    }
    getData(input: string) {
        const letters = input.split('\n').map(val => val.split(''));
        const rows = letters.map(list => list.map(letter => letter.charCodeAt(0) - 97));
        const distances: number[][] = [];
        for (let i = 0; i < rows.length; i++) {
            distances[i] = new Array(rows[0].length).fill(undefined);
        }
        const start = [rows[rows.findIndex(row => row.includes(-14))].findIndex(val => val === -14), rows.findIndex(row => row.includes(-14))];
        const end = [rows[rows.findIndex(row => row.includes(-28))].findIndex(val => val === -28), rows.findIndex(row => row.includes(-28))];
        rows[end[1]][end[0]] = 25; // E is z; z is 25
        rows[start[1]][start[0]] = 0; // S is a; a is 0 
        distances[end[1]][end[0]] = 0; // start searching from the end
        function getAllNextToMeasured() {
            const nextToMeasured: number[][] = [];
            for (let y = 0; y < rows.length; y++) {
                for (let x = 0; x < rows[0].length; x++) {
                    if (distances[y][x] !== undefined) {
                        nextToMeasured.push(...[[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]].filter(([x, y]) => x >= 0 && y >= 0 && x < rows[0].length && y < rows.length).filter(([x, y]) => distances[y][x] === undefined).filter(([x1, y1]) => rows[y][x] - rows[y1][x1] < 2));
                    }
                }
            }
            return nextToMeasured;
        }
        let cycle = 0;
        while (getAllNextToMeasured().length > 0) {
            cycle++;
            getAllNextToMeasured().forEach(([x, y]) => {
                distances[y][x] = cycle;
            });
        }
        return { rows, distances, start };
    }
}