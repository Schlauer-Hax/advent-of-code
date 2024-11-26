import ISolution from "./ISolution.ts";

export default class S2313 implements ISolution {
    firstPart(input: string): string | number {
        const maps = input.split('\n\n');
        let sum = 0;
        scanner: for (const map of maps) {
            // Horizontal Mirror
            const matrix = map.split('\n').map(x => x.split(''));

            // find middle of mirror (two of the same arrays in a row)
            const middles = matrix.filter((item, index) => matrix[index + 1] && matrix[index + 1].join('') === item.join(''));
            for (const middleItem of middles) {
                const middle = matrix.findIndex((item, index) => item.join('') === middleItem.join('') && matrix[index + 1] && matrix[index + 1].join('') === item.join(''));
                const isMirror = matrix.slice(middle + 1).every((item, index) => {
                    const out = (matrix[middle - index] && item.join('') === matrix[middle - index].join('')) || !matrix[middle - index];
                    // console.log(item, matrix[middle - index], out);
                    return out;
                });
                if (isMirror) {
                    // console.log('Horizontal Mirror', middle)
                    sum += (middle + 1) * 100;
                    continue scanner;
                }
            }

            const turned = matrix[0].map((val, index) => matrix.map(row => row[index]).reverse())
            const turnedmiddles = turned.filter((item, index) => turned[index + 1] && turned[index + 1].join('') === item.join(''));
            for (const turnedmiddleItem of turnedmiddles) {
                const turnedmiddle = turned.findIndex((item, index) => item.join('') === turnedmiddleItem.join('') && turned[index + 1] && turned[index + 1].join('') === item.join(''));
                const isTurnedMirror = turned.slice(turnedmiddle + 1).every((item, index) => (turned[turnedmiddle - index] && item.join('') === turned[turnedmiddle - index].join('')) || !turned[turnedmiddle - index]);
                if (isTurnedMirror) {
                    sum += (turnedmiddle + 1);
                    continue scanner;
                }
            }
        }
        return sum;
    }
    secondPart(input: string): string | number {
        // function checkForMirror(matrix: string[][], originalMirror: [number, number] = [-1, -1]) {
        //     const middles = matrix.filter((item, index) => matrix[index + 1] && matrix[index + 1].join('') === item.join(''));
        //     for (const middleItem of middles) {
        //         const middle = matrix.findIndex((item, index) => item.join('') === middleItem.join('') && matrix[index + 1] && matrix[index + 1].join('') === item.join(''));
        //         const isMirror = matrix.slice(middle + 1).every((item, index) => (matrix[middle - index] && item.join('') === matrix[middle - index].join('')) || !matrix[middle - index]);
        //         if (isMirror) {
        //             if (!(originalMirror[1] === (middle + 1) * 100 && originalMirror[0] === 0)) {
        //                 return [0, (middle + 1) * 100];
        //             }
        //         }
        //     }

        //     const turned = matrix[0].map((val, index) => matrix.map(row => row[index]).reverse())
        //     const turnedmiddles = turned.filter((item, index) => turned[index + 1] && turned[index + 1].join('') === item.join(''));
        //     for (const turnedmiddleItem of turnedmiddles) {
        //         const turnedmiddle = turned.findIndex((item, index) => item.join('') === turnedmiddleItem.join('') && turned[index + 1] && turned[index + 1].join('') === item.join(''));
        //         const isTurnedMirror = turned.slice(turnedmiddle + 1).every((item, index) => (turned[turnedmiddle - index] && item.join('') === turned[turnedmiddle - index].join('')) || !turned[turnedmiddle - index]);
        //         if (isTurnedMirror) {
        //             if (!(originalMirror[0] === (turnedmiddle + 1) && originalMirror[1] === 0)) {
        //                 return [1, (turnedmiddle + 1)];
        //             }
        //         }
        //     }
        //     return [-1, -1]
        // }
        // let sum = 0;
        // const maps = input.split('\n\n');
        // for (const map of maps) {
        //     const originalMirror = checkForMirror(map.split('\n').map(x => x.split('')));
        //     if (originalMirror[0] === -1) {
        //         console.log('No mirror found');
        //     }
        //     let newMirror = Array.from(originalMirror);
        //     let x = 0;
        //     let y = 0;
        //     while (newMirror[0] === originalMirror[0] || newMirror[1] === originalMirror[1] || newMirror[0] === -1) {
        //         const newMatrix = map.split('\n').map(x => x.split(''));
        //         newMatrix[y][x] = map.split('\n').map(x => x.split(''))[y][x] === '#' ? '.' : '#';
        //         newMirror = checkForMirror(newMatrix);
        //         if ((newMirror[0] !== originalMirror[0] || newMirror[1] !== originalMirror[1]) && newMirror[0] !== -1) {
        //             // console.log('Mirror found', newMirror, originalMirror);
        //             break;
        //         }
        //         if (x === 0 && y === 6 && originalMirror[0] === 0 && originalMirror[1] === 100) {
        //             console.log('deug')
        //             console.log(map);
        //             console.log(newMatrix);
        //             console.log(newMirror, originalMirror, checkForMirror(map.split('\n').map(x => x.split(''))));
        //         }
        //         x++;
        //         if (x >= newMatrix[0].length) {
        //             x = 0;
        //             y++;
        //         }
        //         if (y >= newMatrix.length) {
        //             console.log();
        //             console.log('No mirror found');
        //             console.log(map)
        //             console.log(newMirror, originalMirror, checkForMirror(map.split('\n').map(x => x.split(''))));
        //             break;
        //         }
        //     }
        //     sum += newMirror[1];
        // }
        // Not solved :(
        
        return 0;
    }
}