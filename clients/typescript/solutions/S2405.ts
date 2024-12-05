import ISolution from "./ISolution.ts";

export default class S2405 implements ISolution {
    firstPart(input: string): (number | string) | Promise<number | string> {
        const [ rules, jobs ] = input.split("\n\n").map(part => part.split("\n").map(part => part.includes("|") ? part.split("|").map(Number) : part.split(",").map(Number)));
        return jobs.map(job =>
            rules.filter(rule => job.some(x => x === rule[ 0 ]) && job.some(x => x === rule[ 1 ]))
                .every(rule => job.findIndex(x => x === rule[ 0 ]) < job.findIndex(x => x === rule[ 1 ])) ? job[ Math.floor(job.length / 2) ] : 0
        ).reduce((a, b) => a + b, 0);
    }
    secondPart(input: string): (number | string) | Promise<number | string> {
        const [ rules, jobs ] = input.split("\n\n").map(part => part.split("\n").map(part => part.includes("|") ? part.split("|").map(Number) : part.split(",").map(Number)));
        return jobs.map(job => {
            const matchingrules = rules.filter(rule => job.some(x => x === rule[ 0 ]) && job.some(x => x === rule[ 1 ]));
            if (!matchingrules.every(rule => job.findIndex(x => x === rule[ 0 ]) < job.findIndex(x => x === rule[ 1 ]))) {
                while (!matchingrules.every(rule => job.findIndex(x => x === rule[ 0 ]) < job.findIndex(x => x === rule[ 1 ]))) {
                    for (const rule of matchingrules) {
                        if (job.findIndex(x => x === rule[ 0 ]) > job.findIndex(x => x === rule[ 1 ])) {
                            const i = job.findIndex(x => x === rule[ 0 ]);
                            const j = job.findIndex(x => x === rule[ 1 ]);
                            job.splice(i, 1);
                            job.splice(j, 0, rule[ 0 ]);
                        }
                    }
                }
                return job[ Math.floor(job.length / 2) ];
            }
            return 0;
        }).reduce((a, b) => a + b, 0);
    }

}