import ISolution from "./ISolution.ts";

export default class S2108 implements ISolution {
    firstPart(input: string): number {
        return input
            .split('\n')
            .map(x => x.split(' | ')[1].split(' ').map(result => result.length))
            .map(result =>
                result.filter(x => x === 2).length +
                result.filter(x => x === 4).length +
                result.filter(x => x === 3).length +
                result.filter(x => x === 7).length)
            .reduce((partialSum, a) => partialSum + a, 0);
    }
    secondPart(input: string): number {
        return input.split('\n').map(line => line.split(' ')).map(numbers => {
            const one = numbers.find(x => x.length === 2)!;
            const four = numbers.find(x => x.length === 4)!;
            const seven = numbers.find(x => x.length === 3)!;
            const eight = numbers.find(x => x.length === 7)!;
            const nine = numbers.filter(x => x.length === 6).find(x => containsNumber(x, four))!;

            const zero = numbers.filter(x => x.length === 6).filter(x => !containsNumber(x, nine)).find(x => containsNumber(x, one))!;
            const six = numbers.filter(x => x.length === 6).filter(x => !containsNumber(x, zero)).find(x => !containsNumber(x, nine))!;

            const three = numbers.filter(x => x.length === 5).find(x => containsNumber(x, one))!;

            const top = seven.split('').find(x => !one.includes(x));
            const bottomleft = nine.split('').find(x => x !== top && !three.includes(x))!;

            const five = numbers.filter(x => x.length === 5).find(x => containsNumber(x, bottomleft))!;
            const two = numbers.filter(x => x.length === 5).filter(x => !containsNumber(x, five)).find(x => !containsNumber(x, three))!;

            const array = [zero, one, two, three, four, five, six, seven, eight, nine]

            const results = numbers.slice(11).map(x => array.map(y => y.split('').sort().join('')).indexOf(x.split('').sort().join('')))!;
            return Number(results.join(''));
        }).reduce((partialSum, a) => partialSum + a, 0);
    }
}

function containsNumber(containednumber: string, numbertocheck: string): boolean {
    return numbertocheck.split('').map(y => containednumber.includes(y)).reduce((partialSum, a) => partialSum && a, true);
}