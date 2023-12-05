import ISolution from "./ISolution.ts";

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
    secondPart(input: string): string | number {
        const out = input.replace('seeds: ', '').split('\n\n').map(g => g.split('\n').filter(s => !s.includes(':')).map(s => s.split(' ').map(Number)));
        let lowest = Number.MAX_SAFE_INTEGER;
        for (let i = 0; i < out[0][0].length / 2; i++) {
            for (let j = 0; j < out[0][0][i * 2 + 1]; j++) {
                let number = out[0][0][i * 2] + j;
                for (let h = 1; h < out.length; h++) {
                    const rule = out[h].find(h => h[1] <= number && h[1] + h[2] > number)
                    if (rule) {
                        number =  number - rule[1] + rule[0]
                    }
                }
                if (number < lowest) {
                    lowest = number;
                    console.log('New low:'+lowest);
                }
            }
        }
        return lowest;
    }

}