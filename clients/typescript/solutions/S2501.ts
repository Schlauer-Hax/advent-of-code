import { ISolution } from "./ISolution.ts";

export default class S2501 implements ISolution {
  firstPart(input: string): string | number {
    let number = 50;
    let hits = 0;
    input.split('\n').forEach(line => {
      const d = line.split('')[0];
      if (d === 'L') {
        number -= parseInt(line.slice(1));
      } else {
        number += parseInt(line.slice(1));
      }
      while (number < 0) number += 100;
      while (number > 99) number -= 100;
      if (number === 0) hits++;
    });
    return hits;
  }
  secondPart(input: string): string | number {
    let number = 50;
    let hits = 0;
    input.split('\n').forEach(line => {
      const d = line.split('')[0];
      if (d === 'L') {
        for (let i = 0; i < parseInt(line.slice(1)); i++) {
          number--;
          if (number < 0) number = 99;
          if (number === 0) hits++;
        }
      } else {
        for (let i = 0; i < parseInt(line.slice(1)); i++) {
          number++;
          if (number > 99) number = 0;
          if (number === 0) hits++;
        }
      }
    });
    return hits;
  }

}
