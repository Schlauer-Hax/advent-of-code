import ISolution from "./ISolution.ts";

export default class S2107 implements ISolution {
    name = 'S2107';
    firstPart(input: string): number {
        const numbers = input.split(',').map(Number);
        return Number([...Array(Math.max(...numbers)).keys()].map(i => i + Math.min(...numbers)).map(val => 
            val + ':' + numbers.map(init => init > val ? init - val : val - init).reduce((partialSum, a) => partialSum + a, 0)
        ).sort((a, b) => Number(a.split(':')[1]) - Number(b.split(':')[1]))[0].split(':')[1]);
    }
    secondPart(input: string): number {
        const numbers = input.split(',').map(Number);
        return Number([...Array(Math.max(...numbers)).keys()].map(i => i + Math.min(...numbers)).map(val => 
            val + ':' + numbers.map(init => init > val ? init - val : val - init).map(factorialize).reduce((partialSum, a) => partialSum + a, 0)
        ).sort((a, b) => Number(a.split(':')[1]) - Number(b.split(':')[1]))[0].split(':')[1]);
    }

}

function factorialize(num: number): number {
    if (num < 0) 
        return -1;
  else if (num == 0) 
      return 0;
  else {
      return (num + factorialize(num - 1));
  }
}