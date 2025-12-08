
import S2504 from "./S2504.ts";
import { assertEquals } from "@std/assert";

const solution = new S2504();
const testinput = 
`..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;

Deno.test("Testinput first part", () => {
    assertEquals(solution.firstPart(testinput), 13);
});

Deno.test("Testinput second part", () => {
    assertEquals(solution.secondPart(testinput), 43);
});
