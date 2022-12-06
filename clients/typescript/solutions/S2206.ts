import ISolution from "./ISolution.ts";

export default class S2206 implements ISolution {
    firstPart(input: string): number {
        const letters = input.split('')
        const duplicates = () => letters.filter((letter, index) => letters.indexOf(letter) !== index && index < 4);
        while(duplicates().length > 0) {
            letters.splice(0, 1)
        }
        return input.length - letters.length +4;
    }
    secondPart(input: string): number {
        const letters = input.split('')
        const duplicates = () => letters.filter((letter, index) => letters.indexOf(letter) !== index && index < 14);
        while(duplicates().length > 0) {
            letters.splice(0, 1)
        }
        return input.length - letters.length +14+1;    
    }
}