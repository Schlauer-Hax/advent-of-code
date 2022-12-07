import ISolution from "./ISolution.ts";

export default class S2207 implements ISolution {
    firstPart(input: string): number {
        return Object.values(this.buildStructure(input)).filter((val) => val <= 100000).reduce((a, b) => a + b);
    }
    secondPart(input: string): number {
        const dirsize = this.buildStructure(input);
        return Object.values(dirsize).filter((val) => val > 30000000 - (70000000 - dirsize['/'])).sort((a, b) => a - b)[0];
    }
    buildStructure(input: string): { [key: string]: number } {
        const dirsize: { [key: string]: number } = {};
        let currentdir = '';
        function addSizeToParentDir(size: number, dir: string) {
            if (dir !== '/') {
                let parentdir = dir.slice(0, dir.lastIndexOf('/'));
                if (parentdir === '') {
                    parentdir = '/';
                }
                dirsize[parentdir] = dirsize[parentdir] ? dirsize[parentdir] + size : size;
                if (parentdir !== '/') {
                    addSizeToParentDir(size, parentdir);
                }
            }
        }
        input.split('\n').forEach(line => {
            if (line.startsWith('$ cd ')) {
                const dir = line.slice(5);
                if (dir === '..') {
                    currentdir = currentdir.slice(0, currentdir.lastIndexOf('/'));
                } else if (dir === '/') {
                    currentdir = '/';
                } else {
                    currentdir += '/' + dir;
                    currentdir = currentdir.replace(/\/\//g, '/'); // remove double slashes at start
                }
            } else if (!line.startsWith('dir ') && !line.startsWith('$ ls')) {
                const size = parseInt(line.split(' ')[0]);
                dirsize[currentdir] = dirsize[currentdir] ? dirsize[currentdir] + size : size;
                addSizeToParentDir(size, currentdir);
            }
        })
        return dirsize;
    }
}