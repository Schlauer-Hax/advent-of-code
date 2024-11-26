import ISolution from "./ISolution.ts";
import routine from "https://deno.land/x/routine/mod.ts";

export default class S2312 implements ISolution {
    firstPart(input: string): string | number {
        const list = input.split('\n');
        return list.map(line => {
            const [map, rule] = line.split(' ');
            const parsedrule = rule.split(',').map(Number);
            return tryGroups(map, parsedrule, 0, 0, []);
        }).reduce((a, b) => a + b, 0);
    }
    async secondPart(input: string): Promise<string | number> {
        // const list = input.split('\n');
        // return (await Promise.all(list.map(line => {
        //     const [map, rule] = line.split(' ');
        //     return routine(tryGroups, [map, map, map, map, map].join('?'), [rule, rule, rule, rule, rule].join(',').split(',').map(Number), 0, 0, []);
        // }))).reduce((a, b) => a + b, 0);
        return 0;
    }
}

function tryGroups(map: string, rule: number[], group: number, start: number, matches: string[]) {
    const groups = map.replaceAll('?', '.').split('.').filter(x => x !== '').map(x => x.length);
    if (rule.every((item, index) => groups[index] === item) && rule.length === groups.length && !matches.includes(map)) {
        matches.push(map);
        return 1;
    }
    let possible = 0;
    for (let i = start; i < map.length; i++) {
        if (map.slice(i, i + rule[group]).length === rule[group] && map.slice(i, i + rule[group]).split('').every(x => x == '?' || x == '#')) {
            const newmap = map.split('');
            if (!map.slice(i, i + rule[group]).split('').every(x => x == '#')) {
                for (let j = 0; j < rule[group]; j++) {
                    newmap[i + j] = '#';
                }
            }
            possible += tryGroups(newmap.join(''), rule, group + 1, i + rule[group] + 1, matches);
        }
    }
    return possible;
}