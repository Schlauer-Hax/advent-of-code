
import S2503 from "./S2503.ts";
import { assertEquals } from "@std/assert";

const solution = new S2503();
const testinput = 
`987654321111111
811111111111119
234234234234278
818181911112111`;

Deno.test("Testinput first part", () => {
    assertEquals(solution.firstPart(testinput), 357);
});

Deno.test("Testinput second part", () => {
    assertEquals(solution.secondPart(testinput), 3121910778619);
});
