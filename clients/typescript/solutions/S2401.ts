import ISolution from "./ISolution.ts";

export default class S2401 implements ISolution {
  firstPart(input: string): (number | string) | Promise<number | string> {
    const lists = input.split("\n").map(x => x.split("   ")).filter(x => x.length === 2);
    const list1 = lists.map(x => Number(x[0])).sort();
    const list2 = lists.map(x => Number(x[1])).sort();
    let sum = 0;
    for (let i = 0; i < list1.length; i++) {
        sum += Math.abs(list1[i] - list2[i]);
    }
    return sum;
  }
  secondPart(input: string): (number | string) | Promise<number | string> {
    const lists = input.split("\n").map(x => x.split("   ")).filter(x => x.length === 2);
    const list1 = lists.map(x => Number(x[0]));
    const list2 = lists.map(x => Number(x[1]));
    let sum = 0;
    for (const number of list1) {
        sum += number*list2.filter(x => x === number).length;
    }
    return sum;
  }

}