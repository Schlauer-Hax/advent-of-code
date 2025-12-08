const testTemplate = (name: string) =>
`
import ${name} from "./${name}.ts";
import { assertEquals } from "@std/assert";

const solution = new ${name}();
const testinput = \`\`;

Deno.test("Testinput first part", () => {
    assertEquals(solution.firstPart(testinput), 0);
});

Deno.test("Testinput second part", () => {
    assertEquals(solution.secondPart(testinput), 0);
});
`

Array.from(Deno.readDirSync("solutions")).forEach((file, _, files) => {
    if (file.name.startsWith("S") && !file.name.includes("test")) {
        if (files.find(f => f.name === file.name.replace(".ts", ".test.ts")) === undefined) {
            Deno.writeTextFileSync(`solutions/${file.name.replace(".ts", ".test.ts")}`, testTemplate(file.name.replace(".ts", "")));
            console.log(`Created test file for ${file.name}`);
        }
    }
})