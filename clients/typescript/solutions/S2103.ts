import ISolution from "./ISolution";

export class S2103 implements ISolution {
    name = 'S2103';
    firstPart(input: string): number {
        const split = input.split('\n');
        let output = '';
        for (let i = 0; i < split[0].length; i++) {
            (split.length / 2 > split.filter(val => val[i] === '1').length) ? output += '0' : output += '1'
        }
        return (parseInt(output, 2) *
            (parseInt(output, 2) ^ Math.pow(2, output.length)-1))
    }
    secondPart(input: string): number {
        const split = input.split('\n');
        const search = (array: string[], i: number, func: (a:number,b:number)=>boolean): string => {
            array = func(array.length / 2, array.filter(val => val[i] === '1').length) ? 
            array.filter(val => val[i] === '0') : array.filter(val => val[i] === '1')
            return (array.length==1) ? array[0] : search(array, i+1, func);
        }
        return parseInt(search(split, 0, (a,b) => a>b), 2) * parseInt(search(split, 0, (a,b) => a <= b), 2)
    }


}

export default S2103;