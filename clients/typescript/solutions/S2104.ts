import ISolution from "./ISolution.ts";

export default class S2104 implements ISolution {
    firstPart(input: string): number {
        const split = input.split('\n');
        const allnumbers = split[0].split(',')
        const checkWin = (numberlength: number): [number, number] => {
            const numbers = allnumbers.slice(0, numberlength);
            for (let board = 0; board < (split.length - 1) / 6; board++) {
                for (let row = 0; row < 5; row++) {
                    if (split[2 + board * 6 + row].split(' ').filter(val => val !== '').filter(val => numbers.includes(val)).length === 5) {
                        return [board, numberlength];
                    }
                }
                for (let column = 0; column < 5; column++) {
                    const results = [...Array(5).keys()].map((val) => split[2 + board * 6 + val].split(' ').filter((val2) => val2 != '').find((_val2, index2) => index2 === column)!).filter(val => numbers.includes(val))
                    if (results.length === 5) {
                        return [board, numberlength];
                    }
                }
            }
            return checkWin(numberlength + 1);

        }
        const result = checkWin(5)
        const lastnum = Number(allnumbers[result[1] - 1]);
        const sum = [...Array(5).keys()].map((index) => split[2 + result[0] * 6 + index].split(' ').filter(val => val !== '' && !allnumbers.slice(0, result[1]).includes(val)).reduce((a, b) => Number(a) + Number(b), 0)).reduce((a, b) => Number(a) + Number(b), 0)
        return sum * lastnum;
    }
    secondPart(input: string): number {
        const split = input.split('\n');
        const allnumbers = split[0].split(',')
        const wins: [number, number][] = []
        const checkWin = (numberlength: number): [number, number] => {
            if (numberlength == allnumbers.length) return wins[wins.length - 1]
            const numbers = allnumbers.slice(0, numberlength);
            for (let board = 0; board < (split.length - 1) / 6; board++) {
                for (let row = 0; row < 5; row++) {
                    if (split[2 + board * 6 + row].split(' ').filter(val => val !== '').filter(val => numbers.includes(val)).length === 5) {
                        if (wins.filter(val => val[0] === board).length === 0)
                            wins.push([board, numberlength]);
                    }
                }
                for (let column = 0; column < 5; column++) {
                    const results = [...Array(5).keys()].map((val) => split[2 + board * 6 + val].split(' ').filter((val2) => val2 != '').find((_val2, index2) => index2 === column)!).filter(val => numbers.includes(val))
                    if (results.length === 5) {
                        if (wins.filter(val => val[0] === board).length === 0) {
                            wins.push([board, numberlength]);
                        }
                    }
                }
            }
            return checkWin(numberlength + 1);

        }
        const result = checkWin(5)
        const lastnum = Number(allnumbers[result[1] - 1]);
        const sum = [...Array(5).keys()].map((index) => split[2 + result[0] * 6 + index].split(' ').filter(val => val !== '' && !allnumbers.slice(0, result[1]).includes(val)).reduce((a, b) => Number(a) + Number(b), 0)).reduce((a, b) => Number(a) + Number(b), 0)
        return sum * lastnum;
    }
}