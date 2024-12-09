import ISolution from "./ISolution.ts";

export default class S2409 implements ISolution {
    firstPart(input: string): (number | string) | Promise<number | string> {
        const numbers = input.split("").map(Number);
        const map: (string | number)[] = [];
        for (let i = 0; i < numbers.length / 2; i++) {
            const size = numbers[ i * 2 ];
            const space = numbers[ i * 2 + 1 ];
            map.push(...Array.from({ length: size }).fill(i) as number[]);
            map.push(...Array.from({ length: space }).fill(".") as string[]);
        }
        for (let i = map.length - 1; i > 0; i--) {
            if (map[ i ] === ".") {
                continue;
            }
            const lastIndex = map.indexOf(".");
            if (lastIndex < i) {
                map[ lastIndex ] = map[ i ];
                map[ i ] = ".";
            }
        }
        return map.reduce((acc: number, val, index) => {
            if (val === ".") {
                return acc;
            }
            return acc + (typeof val === 'number' ? val * index : 0);
        }, 0);
    }
    secondPart(input: string): (number | string) | Promise<number | string> {
        const numbers = input.split("").map(Number);
        const map: (string | number)[] = [];
        for (let i = 0; i < numbers.length / 2; i++) {
            const size = numbers[ i * 2 ];
            const space = numbers[ i * 2 + 1 ];
            map.push(...Array.from({ length: size }).fill(i) as number[]);
            map.push(...Array.from({ length: space }).fill(".") as string[]);
        }
        for (let i = map.length - 1; i > 0; i--) {
            if (map[ i ] === ".") {
                continue;
            }
            const length = map.filter(val => val === map[i]).length;
            const first = map.indexOf(map[i]);
            const lastIndex = map.map(x => x === "." ? x : "x").join("").indexOf(".".repeat(length));
            if (lastIndex < i && lastIndex !== -1) {
                map.splice(lastIndex, length, ...Array.from({ length }).fill(map[i]) as number[]);
                map.splice(first, length, ...Array.from({ length }).fill(".") as string[]);
            }
        }
        return map.reduce((acc: number, val, index) => {
            if (val === ".") {
                return acc;
            }
            return acc + (typeof val === 'number' ? val * index : 0);
        }, 0);
    }

}