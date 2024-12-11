import ISolution from "./ISolution.ts";

export default class S2411 implements ISolution {
  firstPart(input: string): (number | string) | Promise<number | string> {
    const stones = input.split(" ").map(Number);
    for (let i = 0; i < 25; i++) {
        for (let elem = 0; elem < stones.length; elem++) {
            if (stones[elem] === 0) {
                stones[elem] = 1;
                continue;
            }
            if (stones[elem].toString().length % 2 === 0) {
                const half = stones[elem].toString().length / 2;
                stones.splice(elem, 1, Number(stones[elem].toString().substring(0, half)), Number(stones[elem].toString().substring(half)));
                elem++;
                continue;
            }
            stones[elem] *= 2024;
        }
    }
    return stones.length;
  }
  secondPart(input: string): (number | string) | Promise<number | string> {
    const inputstones = input.split(" ").map(Number);
    let stones: Record<number, number> = {};
    inputstones.forEach(stone => {
        stones[stone] ? stones[stone]++ : stones[stone] = 1;
    });
    for (let i = 0; i < 75; i++) {
        const newStones: Record<number, number> = {};
        stones[0] ? newStones[1] = stones[0] : '';
        stones[1] ? newStones[2024] = stones[1] : '';
        for (const key of Object.keys(stones)) {
            if (Number(key) === 0 || Number(key) === 1) {
                continue;
            }
            if (key.length % 2 === 0) {
                const half = key.length / 2;
                [key.substring(0, half), key.substring(half)].map(Number).forEach(half => {
                    if (!Object.hasOwn(newStones, half)) {
                        newStones[half] = 0;
                    }
                    newStones[half] += stones[Number(key)];
                });
                continue;
            }
            newStones[Number(key) * 2024] = stones[Number(key)];
        }
        stones = newStones;
    }
    return Object.entries(stones).reduce((acc, val) => acc + val[1], 0);
  }

}