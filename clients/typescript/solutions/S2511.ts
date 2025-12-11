import ISolution from "./ISolution.ts";
import { assert } from "@std/assert"

export default class S2509 implements ISolution {
    firstPart(input: string): (number | string) | Promise<number | string> {
        const lines = input.split("\n").map(l => l.split(": ")).map(([from, to]) => [from, to.split(" ")]) as [string, string[]][];
        // console.log(lines);
        let positions = [lines.find(([from, to]) => from === "you")].filter(e => e !== undefined)
        let paths = 1;
        while (positions.length > 0) {
            const [from, to] = positions.shift()!;
            to.forEach(element => {
                if (element === "out") return;
                positions.push(lines.find(([f, t]) => f === element)!);
            });
            paths += to.length-1;
        }
        return paths;
    }
    secondPart(input: string): (number | string) | Promise<number | string> {
        const lines = input.split("\n").map(l => l.split(": ")).map(([ from, to ]) => [ from, to.split(" ") ]) as [ string, string[] ][];
        const cache = new Map<string, number>();
        const fftdac = this.pathsTo("fft", "dac", lines, cache)
        if (fftdac === 0) {
            return this.pathsTo("svr", "dac", lines, cache) * this.pathsTo("dac", "fft", lines, cache) * this.pathsTo("fft", "out", lines, cache)
        } else {
            return this.pathsTo("svr", "fft", lines, cache) * fftdac * this.pathsTo("dac", "out", lines, cache)
        }
    }
    pathsTo(from: string, to: string, connections: [string, string[]][], cache: Map<string, number>): number {
        if (cache.has(`${from}-${to}`)) {
            return cache.get(`${from}-${to}`)!;
        }
        const position = connections.find(([f]) => f === from)!;
        let sum = 0;
        position?.[1].forEach(elem => {
            if (elem === to) {
                sum += 1;
            }
            sum += this.pathsTo(elem, to, connections, cache);
        });
        cache.set(`${from}-${to}`, sum);
        return sum;
    }
}