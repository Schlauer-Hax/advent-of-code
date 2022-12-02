import ISolution from "./ISolution.ts";

export default class S2202 implements ISolution {
    name = "S2202";
    firstPart(input: string): number {
        const wins = {
            "rock": "scissors",
            "paper": "rock",
            "scissors": "paper"
        } as { [key: string]: string };
        const playermap = {
            'X': 'rock',
            'Y': 'paper',
            'Z': 'scissors'
        } as { [key: string]: string };
        const elvesmap = {
            'A': 'rock',
            'B': 'paper',
            'C': 'scissors'
        } as { [key: string]: string };

        return input.split("\n").map(line => {
            const [elve, player] = line.split(" ");
            const playermove = playermap[player];
            const elvemove = elvesmap[elve];
            const pluspoints = Object.keys(playermap).indexOf(player) + 1;
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
        const wins = {
            "rock": "scissors",
            "paper": "rock",
            "scissors": "paper"
        } as { [key: string]: string };
        const playermap = {
            'X': 'rock',
            'Y': 'paper',
            'Z': 'scissors'
        } as { [key: string]: string };
        const elvesmap = {
            'A': 'rock',
            'B': 'paper',
            'C': 'scissors'
        } as { [key: string]: string };

        return input.split("\n").map(line => {
            const [elve, player] = line.split(" ");
            const elvemove = elvesmap[elve];
            if (player === 'X') {
                const playermove = Object.entries(wins).find(([key, value]) => value !== elvemove && key !== elvemove)![0];
                const pluspoints = Object.values(playermap).indexOf(playermove) + 1;
                return 0 + pluspoints;
            }
            if (player === 'Y') {
                const playermove = elvemove;
                const pluspoints = Object.values(playermap).indexOf(playermove) + 1;
                return 3 + pluspoints;
            }
            if (player === 'Z') {
                const playermove = Object.entries(wins).find(([key, value]) => value === elvemove)![0];
                const pluspoints = Object.values(playermap).indexOf(playermove) + 1;
                return 6 + pluspoints;
            }
            return 0;
        }).reduce((a, b) => a + b, 0);
    }
}