import ISolution from "./ISolution.ts";
import { assert } from "@std/assert"

export default class S2512 implements ISolution {
    firstPart(input: string): (number | string) | Promise<number | string> {
        return input
            .split("\n")
            .filter(x => x.includes("x"))
            .map(line => line.split(": "))
            .filter(([ size, indexes ]) => size.split("x").map(Number).reduce((a, b) => a * b, 1) >= 9 * indexes.split(" ").map(Number).reduce((a, b) => a + b, 0))
            .length
    }
    secondPart(input: string): (number | string) | Promise<number | string> {
        return ""
    }
}