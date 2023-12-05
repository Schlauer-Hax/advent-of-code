import ISolution from "./ISolution.ts";
import Thread from "https://deno.land/x/Thread@v4.1.0/Thread.ts";

export default class S2303 implements ISolution {
    firstPart(input: string): string | number {
        const out = input.replace('seeds: ', '').split('\n\n').map(g => g.split('\n').filter(s => !s.includes(':')).map(s => s.split(' ').map(Number)));
        let data = out[0][0];
        for (let i = 1; i < out.length; i++) {
            data = data.map(d => {
                const rule = out[i].find(g => g[1] <= d && g[1] + g[2] > d)
                if (rule) {
                    return d - rule[1] + rule[0]
                }
                return d;
            })
        }
        return Math.min(...data);
    }
    async secondPart(input: string): Promise<string | number> {
        const out = input.replace('seeds: ', '').split('\n\n').map(g => g.split('\n').filter(s => !s.includes(':')).map(s => s.split(' ').map(Number)));
        let lowest = Number.MAX_SAFE_INTEGER;
        const promises = [];
        for (let i = 0; i < out[0][0].length / 2; i++) {
            const worker = new Thread<number>((e) => {
                const { out, i } = e.data as { out: number[][][], i: number };
                let lowest = Number.MAX_SAFE_INTEGER;
                for (let j = 0; j < out[0][0][i * 2 + 1]; j++) {
                    let number = out[0][0][i * 2] + j;
                    for (let h = 1; h < out.length; h++) {
                        const rule = out[h].find(h => h[1] <= number && h[1] + h[2] > number)
                        if (rule) {
                            number = number - rule[1] + rule[0]
                        }
                    }
                    if (number < lowest) {
                        lowest = number;
                    }
                }
                return lowest;
            });
            worker.postMessage({
                out, i
            });
            const promise = new Promise<void>((resolve) => {
                worker.onMessage((e) => {
                    if (e < lowest) {
                        lowest = e;
                    }
                    resolve();
                })
            });
            promises.push(promise);
        }
        await Promise.all(promises);
        return lowest;
    }

}