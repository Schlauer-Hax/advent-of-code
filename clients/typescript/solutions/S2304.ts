import ISolution from "./ISolution.ts";

export default class S2303 implements ISolution {
  firstPart(input: string): string | number {
    return input.split('\n').map(line => {
        const numbers = line.split(': ')[1].split(' | ').map(s => s.split(' ').filter(s => s !== '').map(Number));
        return numbers[1].filter(n => numbers[0].includes(n)).length;
    }).map(n => n > 0 ? 2**(n-1) : 0).reduce((a, b) => a + b, 0);
  }
  secondPart(input: string): string | number {
    const winners = input.split('\n').map(line => {
        const numbers = line.split(': ')[1].split(' | ').map(s => s.split(' ').filter(s => s !== '').map(Number));
        return numbers[1].filter(n => numbers[0].includes(n)).length;
    });
    const cards: number[] = winners.map(_ => 1);
    winners.forEach((winner, index) => {
        for (let i = 0; i < winner; i++) {
            cards[index+i+1] += cards[index];
        }
    });
    return cards.reduce((a, b) => a + b, 0);
  }

}