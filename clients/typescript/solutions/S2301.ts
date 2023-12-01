import ISolution from "./ISolution.ts";

export default class S2301 implements ISolution {
    firstPart(input: string): string | number {
        return input.split('\n').map(line => {
            const firstdigit = (line.match(/\d+/g)![0].split('')[0]);
            const lastdigit = (line.match(/\d+/g)!.at(-1)?.split('').at(-1));
            return Number(firstdigit + lastdigit);
        }).reduce((a, b) => a + b, 0);
    }
    secondPart(input: string): string | number {
        const replacemap = {
            one: '1',
            two: '2',
            three: '3',
            four: '4',
            five: '5',
            six: '6',
            seven: '7',
            eight: '8',
            nine: '9',
        }
        return input.split('\n').map(line => {
            let startnumber: string | undefined;
            const firstmatch = line.match(/one|two|three|four|five|six|seven|eight|nine|1|2|3|4|5|6|7|8|9/g);
            if (firstmatch)
                // @ts-ignore
                startnumber = replacemap[firstmatch[0]] ?? firstmatch[0];

            let endnumber: string | undefined;
            for (let end = line.length; end >= 0; end--) {
                const endstring = line.slice(end);
                const endmatch = endstring.match(/one|two|three|four|five|six|seven|eight|nine|1|2|3|4|5|6|7|8|9/g);
                if (endmatch) {
                    // @ts-ignore
                    endnumber = replacemap[endmatch[0]] ?? endmatch[0];
                    break;
                }
            }

            if (startnumber && endnumber) {
                return Number(startnumber + endnumber);
            }
            return 0;
        }).reduce((a, b) => a + b, 0);
    }
}
