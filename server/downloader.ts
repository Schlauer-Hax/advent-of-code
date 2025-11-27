import "@std/dotenv/load";

export async function downloadMissingData(solutions: string[]) {
    const files = Array.from(Deno.readDirSync("../data"));
    const missingsolutions = solutions.filter((sol) =>
        !files.some((file) => file.name.replace(".txt", "") === sol)
    );
    for (const missingsolution of missingsolutions) {
        const year = missingsolution.slice(1, 3);
        const day = missingsolution.slice(3);
        console.log('Starting download of ' + missingsolution);
        await fetch(
            `https://adventofcode.com/20${year}/day/${Number(day)}/input`,
            {
                headers: {
                    cookie: "session=" + Deno.env.get("AOC_SESSION"),
                },
            },
        ).then((response) => response.text()).then(data => {
            Deno.writeTextFile("../data/"+missingsolution+".txt", data.trimEnd());
        });
    }
}
