import ISolution from "./ISolution.ts";

export default class S2505 implements ISolution {
    firstPart(input: string): string | number {
        const [ranges, ids] = input.split("\n\n").map(part => part.split("\n"));
        const formattedranges = ranges.map(range => range.split("-").map(Number));
        let sum = 0;
        for (const id in ids) {
            if (formattedranges.some(range => range[0] <= Number(ids[id]) && Number(ids[id]) <= range[1])) {
                sum++;
            }
        }
        return sum;
    }
    secondPart(input: string): string | number {
        const [ranges] = input.split("\n\n").map(part => part.split("\n"));
        const formattedranges = ranges.map(range => range.split("-").map(Number));
        
        return this.measureRange(formattedranges);
    }
    measureRange(formattedranges: number[][]): number {
        let sum = 0;
        for (let i = 0; i < formattedranges.length; i++) {
            const range = formattedranges[i];
            const overlappingstart = formattedranges.filter(r => 
                (r[0] < range[0] && r[1] >= range[0]) && !(r[0] === range[0] && r[1] === range[1]));
            const fullyenclosed = formattedranges.filter(r =>
                (r[0] >= range[0] && r[1] <= range[1]) && !(r[0] === range[0] && r[1] === range[1]));
            const overlappingend = formattedranges.filter(r =>
                (r[0] <= range[1] && r[1] > range[1]) && !(r[0] === range[0] && r[1] === range[1]));
            formattedranges = formattedranges.filter(r => 
                !(fullyenclosed.map(r => r.join(",")).includes(r.join(",")) || 
                overlappingstart.map(r => r.join(",")).includes(r.join(",")) ||
                overlappingend.map(r => r.join(",")).includes(r.join(",")) ||
                range.join(",") === r.join(",")
            ));

            let newstart = range[0];
            let newend = range[1];
            if (overlappingstart.length > 0) {
                newstart = Math.min(...overlappingstart.map(r => r[0]), newstart);
            }
            if (overlappingend.length > 0) {
                newend = Math.max(...overlappingend.map(r => r[1]), newend);
            }
            formattedranges.push([newstart, newend]);
            if (newstart !== range[0] || newend !== range[1]) {
                i = -1;
            }
            if (overlappingstart.length !== 0 || fullyenclosed.length !== 0 || overlappingend.length !== 0) {
                i = -1; // restart loop
                // console.log("Restarting loop");
            }
            // console.log(i, formattedranges.length, range, overlappingstart, fullyenclosed, overlappingend, [newstart, newend]);
        }
        // console.log("Final Ranges:", formattedranges);
        for (const range of formattedranges) {
            sum += range[1] - range[0] + 1;
        }
        return sum;
    }
}