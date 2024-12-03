import ISolution from "./ISolution.ts";

export default class S2403 implements ISolution {
  firstPart(input: string): (number | string) | Promise<number | string> {
    const matches = input.matchAll(/mul\((\d+),(\d+)\)/g);
    return Array.from(matches).reduce((acc, match) => {
        return acc + parseInt(match[1]) * parseInt(match[2]);
    }, 0);
  }
  secondPart(input: string): (number | string) | Promise<number | string> {
    const matches = input.matchAll(/(mul\((\d+),(\d+)\))|(do\(\))|(don't\(\))/g);
    let en = true;
    return Array.from(matches).reduce((acc, match) => {
        const [instruct, _2, a, b] = match;
        if (instruct === 'do()') en = true;
        if (instruct === 'don\'t()') en = false;
        if (instruct.startsWith('mul')) {
            if (en) {
                return acc + parseInt(a) * parseInt(b);
            }
        }
        return acc;
    }, 0);
  }

}