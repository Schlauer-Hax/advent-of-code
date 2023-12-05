export interface ISolution {
    firstPart(input: string): (number | string) | Promise<number | string>;
    secondPart(input: string): (number | string) | Promise<number | string>;
}

export default ISolution;