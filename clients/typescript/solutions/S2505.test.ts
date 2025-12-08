import S2505 from "./S2505.ts";
import { assertEquals } from "@std/assert";

const solution = new S2505();

Deno.test("Overlapping chain merges all", () => {
    assertEquals(solution.secondPart(`1-4\n3-7\n6-9\n\n2\n4\n6\n8`), 9);
})

Deno.test("Fully contained ranges collapse", () => {
    assertEquals(solution.measureRange([[1, 10], [2, 3], [4, 9]]), 10);
});

Deno.test("Duplicate ranges dedupe", () => {
    assertEquals(solution.measureRange([[5, 8], [5, 8], [5, 8]]), 4);
});

Deno.test("Non-overlapping unordered ranges kept separate", () => {
    assertEquals(solution.measureRange([[10, 12], [1, 4], [5, 8]]), 11);
});

Deno.test("Touching ends do not merge", () => {
    assertEquals(solution.measureRange([[3, 5], [6, 8]]), 6);
});

Deno.test("Shared endpoint overlaps merge", () => {
    assertEquals(solution.measureRange([[3, 5], [5, 8]]), 6);
});

Deno.test("Negative ranges merge correctly", () => {
    assertEquals(solution.measureRange([[-5, -1], [-3, 2]]), 8);
});

Deno.test("Single point range works", () => {
    assertEquals(solution.measureRange([[42, 42]]), 1);
});

