import ISolution from "./ISolution";

export class S2105 implements ISolution {
    name = 'S2105';
    firstPart(input: string): number {
        const lines = input.split('\n');
        const array: any[] = [];
        let count = 0;
        lines.forEach(line => {
            const smollsplit = line.split(' -> ');
            const x1 = Number(smollsplit[0].split(',')[0])
            const x2 = Number(smollsplit[1].split(',')[0])
            const y1 = Number(smollsplit[0].split(',')[1])
            const y2 = Number(smollsplit[1].split(',')[1])

            if (x1 === x2 || y1 === y2) {
                if (x1 === x2) {
                    if (y1 > y2) {
                        for (let index = y2; index <= y1; index++) {
                            array.push(x1 + ',' + index)
                        }
                    } else {
                        for (let index = y1; index <= y2; index++) {
                            array.push(x1 + ',' + index)
                        }
                    }
                } else {
                    if (x1 > x2) {
                        for (let index = x2; index <= x1; index++) {
                            array.push(index + ',' + y1)
                        }
                    } else {
                        for (let index = x1; index <= x2; index++) {
                            array.push(index + ',' + y1)
                        }
                    }
                }
            }
        })
        const duplicates = array.filter((item, index) => array.indexOf(item) !== index);
        const duplicatesfromduplicates = duplicates.filter((item, index) => duplicates.indexOf(item) !== index);
        return duplicates.length - duplicatesfromduplicates.length;
    }
    secondPart(input: string): number {
        const lines = input.split('\n');
        const array: any[] = [];
        let count = 0;
        lines.forEach(line => {
            const smollsplit = line.split(' -> ');
            const x1 = Number(smollsplit[0].split(',')[0])
            const x2 = Number(smollsplit[1].split(',')[0])
            const y1 = Number(smollsplit[0].split(',')[1])
            const y2 = Number(smollsplit[1].split(',')[1])

            if (x1 === x2 || y1 === y2) {
                if (x1 === x2) {
                    if (y1 > y2) {
                        for (let index = y2; index <= y1; index++) {
                            array.push(x1 + ',' + index)
                        }
                    } else {
                        for (let index = y1; index <= y2; index++) {
                            array.push(x1 + ',' + index)
                        }
                    }
                } else {
                    if (x1 > x2) {
                        for (let index = x2; index <= x1; index++) {
                            array.push(index + ',' + y1)
                        }
                    } else {
                        for (let index = x1; index <= x2; index++) {
                            array.push(index + ',' + y1)
                        }
                    }
                }
            } else {
                if (y1 > y2) {
                    if (x1 > x2) {
                        for (let offset = 0; offset <= x1-x2; offset++) {
                            array.push((x2+offset) + ',' + (y2+offset))
                        }
                    } else {
                        for (let offset = 0; offset <= x2-x1; offset++) {
                            array.push((x1+offset) + ',' + (y1-offset))
                        }
                    }
                } else {
                    if (x1 > x2) {
                        for (let offset = 0; offset <= x1-x2; offset++) {
                            array.push((x2+offset) + ',' + (y2-offset))
                        }
                    } else {
                        for (let offset = 0; offset <= x2-x1; offset++) {
                            array.push((x1+offset) + ',' + (y1+offset))
                        }
                    }
                }
            }
        })
        const duplicates = array.filter((item, index) => array.indexOf(item) !== index);
        const duplicatesfromduplicates = duplicates.filter((item, index) => duplicates.indexOf(item) !== index);
        return duplicates.length - duplicatesfromduplicates.length;
    }

}

export default S2105;