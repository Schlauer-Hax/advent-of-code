
import S2501 from "./S2501.ts";
import { assertEquals } from "@std/assert";

const solution = new S2501();
const testinput = 
`L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

Deno.test("Testinput first part", () => {
    assertEquals(solution.firstPart(testinput), 3);
});

Deno.test("Testinput second part", () => {
    assertEquals(solution.secondPart(testinput), 6);
});
