import ISolution from "./ISolution.ts";

export default class S2202 implements ISolution {
    firstPart(input: string): number {
        const wins: { [key: number]: number } = { 0: 2, 1: 0, 2: 1 };
        return input.split("\n").map(line => {
            const [elve, player] = line.split(" ");
            const playermove = player.charCodeAt(0) - 88;
            const elvemove = elve.charCodeAt(0) - 65;
            const pluspoints = playermove + 1;
            if (playermove === elvemove) {
                return 3 + pluspoints;
            }
            if (wins[playermove] === elvemove) {
                return 6 + pluspoints;
            }
            return 0 + pluspoints;
        }).reduce((a, b) => a + b, 0);
    }
    secondPart(input: string): number {
        const wins: { [key: number]: number } = { 0: 2, 1: 0, 2: 1 };
        return input.split("\n").map(line => {
            const [elve, player] = line.split(" ");
            const elvemove = elve.charCodeAt(0) - 65;
            let playermove;
            if (player === 'X') {
                playermove = Object.entries(wins).map(e => [Number(e[0]), Number(e[1])]).find(([key, value]) => value !== elvemove && key !== elvemove)![0];
            } else if (player === 'Y') {
                playermove = elvemove;
            } else {
                playermove = Object.entries(wins).map(e => [Number(e[0]), Number(e[1])]).find(([_, value]) => value === elvemove)![0];
            }
            return playermove + 1 + (player.charCodeAt(0) - 88) * 3;
        }).reduce((a, b) => a + b, 0);
    }
}