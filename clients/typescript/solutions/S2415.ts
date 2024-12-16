import ISolution from "./ISolution.ts";

export default class S2415 implements ISolution {
  firstPart(input: string): (number | string) | Promise<number | string> {
    const [ rawmap, rawinstructions ] = input.split("\n\n");
    const map = rawmap.split("\n").map((row) => row.split(""));
    const instructions = rawinstructions.split("");
    for (const instruction of instructions) {
      const y = map.findIndex((row) => row.includes("@"));
      const x = map[ y ].indexOf("@");
      const move = this.moveable(map, x, y, instruction);
      if (move > 0) {
        if (instruction === "<") {

          map[ y ][ x ] = ".";
          map[ y ][ x - 1 ] = "@";
          if (move > 1) {
            map[ y ][ x - move ] = "O";
          }
        }
        if (instruction === ">") {
          map[ y ][ x ] = ".";
          map[ y ][ x + 1 ] = "@";
          if (move > 1) {
            map[ y ][ x + move ] = "O";
          }
        }
        if (instruction === "^") {
          map[ y ][ x ] = ".";
          map[ y - 1 ][ x ] = "@";
          if (move > 1) {
            map[ y - move ][ x ] = "O";
          }
        }
        if (instruction === "v") {
          map[ y ][ x ] = ".";
          map[ y + 1 ][ x ] = "@";
          if (move > 1) {
            map[ y + move ][ x ] = "O";
          }
        }
      }
    }
    // console.log(map.map((row) => row.join("")).join("\n"));
    return map.map((row, y) => row.map((cell, x) => cell === "O" ? 100*y+x : 0)).flat().reduce((a, b) => a + b);
  }
  moveable(map: string[][], x: number, y: number, direction: string): number {
    if (direction === "<") {
      if (map[ y ][ x - 1 ] === "#") {
        return 0;
      }
      if (map[ y ][ x - 1 ] === "O") {
        const moves = this.moveable(map, x - 1, y, direction);
        return moves > 0 ? moves + 1 : 0;
      }
      if (map[y][x-1] === "]") {
        const moves = this.moveable(map, x - 2, y, direction);
        return moves > 0 ? moves + 2 : 0;
      }
      return 1;
    }
    if (direction === ">") {
      if (map[ y ][ x + 1 ] === "#") {
        return 0;
      }
      if (map[ y ][ x + 1 ] === "O") {
        const moves = this.moveable(map, x + 1, y, direction);
        return moves > 0 ? moves + 1 : 0;
      }
      if (map[y][x+1] === "[") {
        const moves = this.moveable(map, x + 2, y, direction);
        return moves > 0 ? moves + 2 : 0;
      }
      return 1;
    }
    if (direction === "^") {
      if (map[ y - 1 ][ x ] === "#") {
        return 0;
      }
      if (map[ y - 1 ][ x ] === "O") {
        const moves = this.moveable(map, x, y - 1, direction);
        return moves > 0 ? moves + 1 : 0;
      }
      if (map[y-1][x] === "[") {
        const moves1 = this.moveable(map, x, y - 1, direction);
        const moves2 = this.moveable(map, x+1, y - 1, direction);
        return Math.min(moves1, moves2) > 0 ? Math.max(moves1, moves2) + 1 : 0;
      }
      if (map[y-1][x] === "]") {
        const moves1 = this.moveable(map, x, y - 1, direction);
        const moves2 = this.moveable(map, x-1, y - 1, direction);
        return Math.min(moves1, moves2) > 0 ? Math.max(moves1, moves2) + 1 : 0;
      }
      return 1;
    }
    if (direction === "v") {
      if (map[ y + 1 ][ x ] === "#") {
        return 0;
      }
      if (map[ y + 1 ][ x ] === "O") {
        const moves = this.moveable(map, x, y + 1, direction);
        return moves > 0 ? moves + 1 : 0;
      }
      return 1;
    }
    return 0;
  }
  secondPart(input: string): (number | string) | Promise<number | string> {
    return "";
  }

}