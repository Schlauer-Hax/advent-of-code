import ISolution from "./ISolution.ts";

export class S2102 implements ISolution {
    name = 'S2102';
    firstPart(input: string): number {
        let horizontal = 0;
        let depth = 0;
        input.split('\n').forEach(line => {
            const split = line.split(' ');
            const number = Number(split[1]);
            switch (split[0]) {
                case 'forward':
                    horizontal+=number;
                break;
                case 'down':
                    depth+=number;
                break;
                case 'up':
                    depth-=number;
                break;
            }
        })
        return horizontal*depth;
    }
    secondPart(input: string): number {
        let horizontal = 0;
        let aim = 0;
        let depth = 0;
        input.split('\n').forEach(line => {
            const split = line.split(' ');
            const number = Number(split[1]);
            switch (split[0]) {
                case 'forward':
                    horizontal+=number;
                    depth+=aim*number;
                break;
                case 'down':
                    aim+=number;
                break;
                case 'up':
                    aim-=number;
                break;
            }
        })
        return horizontal*depth;
    }
    
}
export default S2102;