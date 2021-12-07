import ISolution from "./ISolution";

export class S2106 implements ISolution {
    name = 'S2106';
    firstPart(input: string): number {
        let list = [0,0,0,0,0,0,0,0,0];
        input.split(',').forEach(val => {
            list[Number(val)]++;
        })
        for (let i = 0; i<80; i++) {
            list = [list[1], list[2], list[3], list[4], list[5], list[6], list[7]+list[0], list[8], list[0]];
        }
        return list.reduce((a,b) => a+b, 0);
    }
    secondPart(input: string): number {
        let list = [0,0,0,0,0,0,0,0,0];
        input.split(',').forEach(val => {
            list[Number(val)]++;
        })
        for (let i = 0; i<256; i++) {
            list = [list[1], list[2], list[3], list[4], list[5], list[6], list[7]+list[0], list[8], list[0]];
        }
        return list.reduce((a,b) => a+b, 0);
    }

}

export default S2106;