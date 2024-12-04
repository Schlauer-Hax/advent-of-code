import ISolution from "./ISolution.ts";

export default class S2404 implements ISolution {
  firstPart(input: string): (number | string) | Promise<number | string> {
    const lines = input.split("\n");
    let sum = 0;
    for (const line of lines) {
        sum += Array.from(line.matchAll(/XMAS/g)).length
        sum += Array.from(line.matchAll(/SAMX/g)).length
    }
    for (let i = 0; i < lines[0].length; i++) {
        const search = lines.map(line => line[i]).join("")
        sum += Array.from(search.matchAll(/XMAS/g)).length
        sum += Array.from(search.matchAll(/SAMX/g)).length
    }
    for (let i = 0; i < lines.length-3; i++) {
        for (let j = 0; j < lines[0].length-3; j++) {
            const search = [lines[i][j], lines[i+1][j+1], lines[i+2][j+2], lines[i+3][j+3]].join("");
            sum += Array.from(search.matchAll(/XMAS/g)).length
            sum += Array.from(search.matchAll(/SAMX/g)).length
        }
    }
    for (let i = 0; i < lines.length-3; i++) {
        for (let j = 3; j < lines[0].length; j++) {
            const search = [lines[i][j], lines[i+1][j-1], lines[i+2][j-2], lines[i+3][j-3]].join("");
            sum += Array.from(search.matchAll(/XMAS/g)).length
            sum += Array.from(search.matchAll(/SAMX/g)).length
        }
    }

    return sum;
  }
  secondPart(input: string): (number | string) | Promise<number | string> {
    const lines = input.split("\n").map(line => line.split(""));
    let sum = 0;
    for (let i = 1; i < lines.length-1; i++) {
        for (let j = 1; j < lines[0].length-1; j++) {
            if (lines[i][j] === "A") {
                if (((lines[i-1][j-1] === "S" && lines[i+1][j+1] === "M") || (lines[i-1][j-1] === "M" && lines[i+1][j+1] === "S")) && 
                ((lines[i-1][j+1] === "S" && lines[i+1][j-1] === "M") || (lines[i-1][j+1] === "M" && lines[i+1][j-1] === "S"))) {
                    sum++;    
                }
            }
        }
    }
    return sum;
  }

}