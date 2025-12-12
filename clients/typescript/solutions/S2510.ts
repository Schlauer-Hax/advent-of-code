// import ISolution from "./ISolution.ts";
import ISolution from "./ISolution.ts";
import { init } from "z3-solver";
import routine from "routine";

export default class S2510 implements ISolution {
    // logTree(node: any, type: 'light' | 'energy' = "light", depth: number = 0) {
    //     console.log(" ".repeat(depth * 2) + `Button: ${node.buttonIndex}, State: ${type === "light" ? node.state.map(s => s ? "#" : ".").join("") : node.state.join(",")}`);
    //     for (const child of node.next) {
    //         this.logTree(child, type, depth + 1);
    //     }
    // }
    async firstPart(input: string): Promise<number | string> {
        const lines = input.split("\n").map(line => line.split(" "));
        type Node = {
            prev: Node | null;
            buttonIndex: number;
            state: boolean[];
            next: Node[];
        };
        const solveDevice = (device: string[]) => {
            const config = device[0].slice(1, -1).split("").map( x => x === "#" ? true : false);
            const buttons = device.slice(1, -1).map(x => x.slice(1, -1).split(",").map(Number));

            const start = {
                buttonIndex: -1,
                state: config.map(_ => false),
                next: [],
                prev: null,
            }
            const queue: Node[] = [start];
            while (queue.length > 0) {
                const current = queue.shift()!;
                for (let i = 0; i < buttons.length; i++) {
                    const button = buttons[i];
                    const nextState = [...current.state].map((s, index) => button.includes(index) ? !s : s);
                    const nextNode: Node = {
                        prev: current,
                        buttonIndex: i,
                        state: nextState,
                        next: [],
                    };
                    // console.log(nextNode);
                    current.next.push(nextNode);
                    if (nextState.every((s, i) => s === config[i])) {
                        // this.logTree(start);
                        let count = 0;
                        let node: Node | null = nextNode;
                        while (node && node.buttonIndex !== -1) {
                            count++;
                            node = node.prev;
                        }
                        return count;
                    }
                    queue.push(nextNode);
                }
            }
        };
        const out = await Promise.all(lines.map(line => routine(solveDevice, line)));
        console.log(out);
        return out.reduce((a, b) => a + b, 0);
    }
    async secondPart(input: string): Promise<number | string> {
        return ""; // This needs to be run with ts-node because of z3-solver which is not deno (or bun) compatible
        const lines = input.split("\n").map(line => line.split(" "));
        const { Context } = await init();
        const { Optimize, Int } = Context("main")
        // type Node = {
        //     prev: Node | null;
        //     buttonIndex: number;
        //     state: number[];
        //     next: Node[];
        // };
        const solveDevice = async (device: string[]) => {
            const config = device.at(-1)!.slice(1, -1).split(",").map(Number);
            const buttons = device.slice(1, -1).map(x => x.slice(1, -1).split(",").map(Number));

            console.log(config, buttons)

            const solver = new Optimize();
            const vars = buttons.map((button, buttonIndex) => {
                const pressCount = Int.const(`b${buttonIndex}`);
                solver.add(pressCount.ge(0));
                return [button, pressCount] as const;
            });
            config.forEach((needed, ledIndex) => {
                let ledNeeded: any = Int.val(0);
                vars.forEach(([button, pressCount]) => {
                    if (button.includes(ledIndex)) {
                        ledNeeded = ledNeeded.add(pressCount);
                    }
                });
                ledNeeded = ledNeeded.eq(Int.val(needed))
                solver.add(ledNeeded);
            });
            const sum = vars.reduce((a, [, pressCount]) => a.add(pressCount), Int.val(0));
            solver.minimize(sum);
            const res = await solver.check();
            if (res === "unsat") {
                throw new Error("No solution found");
            }
            return solver.model().eval(sum).toString();


            // const allowedSpace = Math.max(...config).toString().length;
            // // console.log(allowedSpace);
            // const endresult = Number(config.map(v => v.toString().padStart(allowedSpace, '0')).join(""));
            // // console.log(buttons);
            // const parts = buttons.map(b => config.map((_, i) => (b.includes(i) ? 1 : 0)).map(s => Number(s)));
            // // console.log(config);
            // // console.log(`${endresult} = ${parts.join(" + ")}`);
            // let lowestFactor = Infinity;
            // const test = (sum: number, left: number[][], needed: number, usedFactors: number[]) => {
            //     const factorParts = left[0];
            //     for (let i = 0; i < 10**allowedSpace; i++) {
            //         if (needed + i >= lowestFactor) {
            //             break;
            //         }
            //         const multipliedFactor = factorParts.map(v => v * i);
            //         if (!multipliedFactor.every(v => v.toString().length <= allowedSpace)) {
            //             break;
            //         }
            //         const newSum = sum + multipliedFactor.map((v, i) => v * 10**(allowedSpace * (config.length - 1 - i))).reduce((a, b) => a + b, 0);
            //         if (left.length === 1) {
            //             if (newSum === endresult) {
            //                 // return [i];
            //                 if (needed < lowestFactor) {
            //                     lowestFactor = needed + i;
            //                     // console.log(`Found ${lowestFactor} with factors ${[...usedFactors, i].join(", ")}`);
            //                 }
            //             }
            //         } else {
            //             test(newSum, left.slice(1), needed + i, [...usedFactors, i]);
            //         }
            //     }
            // }
            // test(0, parts, 0, []);
            // console.log(lowestFactor, device);
            // return lowestFactor;
            // const start = {
            //     buttonIndex: -1,
            //     state: config.map(_ => 0),
            //     next: [],
            //     prev: null,
            // }
            // const queue: Node[] = [start];
            // // let count = 0;
            // while (queue.length > 0) {
            //     const current = queue.shift()!;
            //     for (let i = 0; i < buttons.length; i++) {
            //         const button = buttons[i];
            //         const nextState = [...current.state].map((s, index) => button.includes(index) ? s + 1 : s);
            //         const nextNode: Node = {
            //             prev: current,
            //             buttonIndex: i,
            //             state: nextState,
            //             next: [],
            //         };
            //         // console.log(nextNode);
            //         current.next.push(nextNode);
            //         if (nextState.every((s, i) => s === config[i])) {
            //             // this.logTree(start);
            //             let count = 0;
            //             let node: Node | null = nextNode;
            //             while (node && node.buttonIndex !== -1) {
            //                 count++;
            //                 node = node.prev;
            //             }
            //             console.log("Found solution with count:", count);
            //             return count;
            //         }
            //         if (!nextState.some((s, i) => s > config[i])) {
            //             queue.push(nextNode);
            //         }
            //     }
            // if (count++ > 5*12) {
            //     this.logTree(start, "energy");
            //     return 0;
            // }
            // }
        };
        // solveDevice("[..#####.##] (2,7,8,9) (0,1,2,4,6,7,9) (1,2,3,4,5,6,7,8) (1,3,4,8) (3,8,9) (1,2,4,7) (0,1,2,3,7,9) (0,1,2,3,5,7,9) (1,7,9) (0,2,3,4,5,8,9) {121,156,148,157,49,20,23,151,63,159}".split(" "));
        // solveDevice("[####] (1,2) (0) (1,3) (0,3) {6,25,12,16}".split(" "));
        // solveDevice(lines[1]);
        // return solveDevice(lines[ 0 ]);
        let sum = 0;
        for (const line of lines) {
            const result = await solveDevice(line);
            console.log("Result for line:", line.join(" "), "is", result);
            sum += Number(result);
        }
        return sum;
        // const out = await Promise.all(lines.map(line => routine(solveDevice, line)));
        // console.log(out);
        // return out.reduce((a, b) => a + b, 0);
    }
}

// Bun.file("../../data/S2510.txt").text().then(text => new S2510().secondPart(text)).then(result => {
//     console.log("Result:", result);
// });

// import * as fs from 'fs';
// const text = fs.readFileSync('../../data/S2510.txt','utf8');
// new S2510().secondPart(text).then(result => {
//     console.log("Result:", result);
// });