
import S2506 from "./S2506.ts";
import { assertEquals } from "@std/assert";

const solution = new S2506();
const testinput = 
`123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;

Deno.test("Testinput first part", () => {
    assertEquals(solution.firstPart(testinput), 4277556);
});

Deno.test("Testinput second part", () => {
    assertEquals(solution.secondPart(testinput), 3263827);
});

