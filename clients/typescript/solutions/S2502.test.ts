
import S2502 from "./S2502.ts";
import { assertEquals } from "@std/assert";

const solution = new S2502();
const testinput = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`;

Deno.test("Testinput first part", () => {
    assertEquals(solution.firstPart(testinput), 1227775554);
});

Deno.test("Testinput second part", () => {
    assertEquals(solution.secondPart(testinput), 4174379265);
});
