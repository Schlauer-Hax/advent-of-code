import ISolution from "./ISolution.ts";

export default class S2303 implements ISolution {
    firstPart(input: string): string | number {
        let sum = 1;
        const out = input.split('\n').map(list => list.split(' ').filter(s => s !== '' && !s.includes(':')).map(Number));
        for (let i = 0; i < out[0].length; i++) {
            const maxTime = out[0][i];
            const neededLength = out[1][i];
            let possible = 0;
            for (let timeorspeed = 0; timeorspeed < maxTime; timeorspeed++) {
                if (timeorspeed * (maxTime - timeorspeed) > neededLength) {
                    possible++;
                }
                
            }
            sum*=possible;
        }
        return sum;
    }
    secondPart(input: string): string | number {
        const out = input.split('\n').map(list => Number(list.split(': ')[1].replaceAll(' ', '')));
        const maxTime = out[0]
        const neededLength = out[1];
        let possible = 0;
        for (let timeorspeed = 0; timeorspeed < maxTime; timeorspeed++) {
            if (timeorspeed * (maxTime - timeorspeed) > neededLength) {
                possible++;
            }   
        }
        return possible;
    }
}