import ISolution from './ISolution.ts';

export default class S2209 implements ISolution {
    firstPart(input: string): string | number {
        let [x1, y1, x2, y2] = [0, 0, 0, 0];
        const positions: [number, number][] = [];
        input.split('\n').forEach(line => {
            const [direction, stepsize] = line.split(' ');
            for (let i = 0; i < Number(stepsize); i++) {
                switch (direction) {
                    case 'U': y1++; break;
                    case 'D': y1--; break;
                    case 'R': x1++; break;
                    case 'L': x1--; break;
                }
                [x2, y2] = this.getNextPosition([x1, y1], [x2, y2]);
                positions.push([x2, y2]);
            }
        })
        return positions.filter((v, i, a) => a.findIndex(t => (t[0] === v[0] && t[1] === v[1])) === i).length;
    }
    secondPart(input: string): string | number {
        const knots = new Array(9).fill([0, 0]);
        let [x1, y1] = [0, 0];
        const positions: [number, number][] = [];
        input.split('\n').forEach(line => {
            const [direction, stepsize] = line.split(' ');
            for (let i = 0; i < Number(stepsize); i++) {
                switch (direction) {
                    case 'U': y1++; break;
                    case 'D': y1--; break;
                    case 'R': x1++; break;
                    case 'L': x1--; break;
                }
                knots.forEach((knot, index) => {
                    if (index === 0) {
                        knots[index] = this.getNextPosition([x1, y1], knot);
                    } else {
                        knots[index] = this.getNextPosition(knots[index - 1], knot);
                    }
                })
                positions.push(knots[knots.length - 1]);
            }
        })
        return positions.filter((v, i, a) => a.findIndex(t => (t[0] === v[0] && t[1] === v[1])) === i).length;
    }
    getNextPosition([x1, y1]: [number, number], [x2, y2]: [number, number]) {
        // Diagonal Up Right
        if (x1 - x2 === 1 && y1 - y2 === 2) {
            x2 = x1;
            y2 = y1 - 1;
        }
        // Diagonal Up Left
        if (x1 - x2 === -1 && y1 - y2 === 2) {
            x2 = x1;
            y2 = y1 - 1;
        }
        // Diagonal Down Right
        if (x1 - x2 === 1 && y1 - y2 === -2) {
            x2 = x1;
            y2 = y1 + 1;
        }
        // Diagonal Down Left
        if (x1 - x2 === -1 && y1 - y2 === -2) {
            x2 = x1;
            y2 = y1 + 1;
        }
        // Diagonal Left Up
        if (x1 - x2 === -2 && y1 - y2 === 1) {
            x2 = x1 + 1;
            y2 = y1;
        }
        // Diagonal Left Down
        if (x1 - x2 === -2 && y1 - y2 === -1) {
            x2 = x1 + 1;
            y2 = y1;
        }
        // Diagonal Right Down
        if (x1 - x2 === 2 && y1 - y2 === -1) {
            x2 = x1 - 1;
            y2 = y1;
        }
        // Diagonal Right Up
        if (x1 - x2 === 2 && y1 - y2 === 1) {
            x2 = x1 - 1;
            y2 = y1;
        }
        // Follow right
        if (x1 - x2 === 2) {
            x2 = x1 - 1;
        }
        // Follow up
        if (y1 - y2 === 2) {
            y2 = y1 - 1;
        }
        // Follow left
        if (x1 - x2 === -2) {
            x2 = x1 + 1;
        }
        // Follow down
        if (y1 - y2 === -2) {
            y2 = y1 + 1;
        }
        return [x2, y2];
    }

}