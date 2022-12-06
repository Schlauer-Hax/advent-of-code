import ISolution from './ISolution.ts';

export default class S2205 implements ISolution {
    firstPart(input: string): string {
        const [inventory, instructions] = input.split('\n\n').map(stack => stack.split('\n'));
        // get a list of all crates on one height
        const stackstemp = inventory.map(stack => stack.split(''))
        // get the positions of the crates
        const positions = (stackstemp[stackstemp.length-1].map((val, index) => [val, index]).filter((val) => val[0] !== ' ').map(val => val[1]))
        let stacks: string[][] = []
        // get the crates from bottom to top in a list
        stackstemp.slice(0, stackstemp.length-1).reverse().forEach(stack => {
            positions.forEach((pos: any, index) => {
                if (!stacks[index]) {
                    stacks[index] = []
                }
                stacks[index].push(stack[pos])
            });
        });
        // remove empty spaces
        stacks = stacks.map(stack => stack.filter(val => val !== ' '));
        instructions.forEach(move => {
            const split = move.split(' ');
            const fromstack = stacks[parseInt(split[3])-1];
            const moved = fromstack.splice(fromstack.length-parseInt(split[1])).reverse();
            stacks[parseInt(split[5])-1].push(...moved);
        })
        return stacks.map(stack => stack[stack.length-1]).join('');
    }
    secondPart(input: string): string {
        const [inventory, instructions] = input.split('\n\n').map(stack => stack.split('\n'));
        const stackstemp = inventory.map(stack => stack.split(''))
        const positions = (stackstemp[stackstemp.length-1].map((val, index) => [val, index]).filter((val) => val[0] !== ' ').map(val => val[1]))
        let stacks: string[][] = []
        stackstemp.slice(0, stackstemp.length-1).reverse().forEach(stack => {
            positions.forEach((pos: any, index) => {
                if (!stacks[index]) {
                    stacks[index] = []
                }
                stacks[index].push(stack[pos])
            });
        });
        stacks = stacks.map(stack => stack.filter(val => val !== ' '));
        instructions.forEach(move => {
            const split = move.split(' ');
            const fromstack = stacks[parseInt(split[3])-1];
            const moved = fromstack.splice(fromstack.length-parseInt(split[1]));
            stacks[parseInt(split[5])-1].push(...moved);
        })
        return stacks.map(stack => stack[stack.length-1]).join('');
    }

}