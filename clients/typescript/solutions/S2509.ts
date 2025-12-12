import ISolution from "./ISolution.ts";

export default class S2509 implements ISolution {
    bounds = ([x1, y1]: number[], [x2, y2]: number[]) => [ Math.min(x1, x2), Math.min(y1, y2), Math.max(x1, x2), Math.max(y1, y2) ];
    area = ([x1, y1, x2, y2]: number[]) => (x2 - x1 + 1) * (y2 - y1 + 1);
    areaDesc = (a: number[], b: number[]) => this.area(b) - this.area(a);

    firstPart(input: string): (number | string) | Promise<number | string> {
        const red = input.split("\n").map(s => s.split(",").map(Number));
        const pairs = red.flatMap((p, i) => red.slice(i + 1).map(q => this.bounds(p, q))).sort(this.areaDesc);
        return this.area(pairs[0]);
    }
    secondPart(input: string): (number | string) | Promise<number | string> {
        const red = input.split("\n").map(s => s.split(",").map(Number));
        const pairs = red.flatMap((p, i) => red.slice(i + 1).map(q => this.bounds(p, q))).sort(this.areaDesc);
        const lines = red.map((p, i) => this.bounds(p, red[ (i + 1) % red.length ])).sort(this.areaDesc);
        const good = pairs.find(([ l, t, r, b ]) => !lines.find(([ lx, ly, rx, ry ]) => lx < r && ly < b && rx > l && ry > t));
        return this.area(good!);
    }
}
