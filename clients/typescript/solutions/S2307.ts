import ISolution from "./ISolution.ts";

export default class S2303 implements ISolution {
    firstPart(input: string): string | number {
        const order = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
        const out: [number, string, number][] = input.split('\n').map(game => {
            const [hand, bid] = game.split(' ');
            // Five of a kind
            if (hand.split('').every((val, i, arr) => val === arr[0])) {
                return [0, hand, Number(bid)];
            }
            // Four of a kind
            const four = hand.split('').filter((val, i, arr) => arr.filter(v => v === val).length === 4);
            if (four.length === 4) {
                return [1, hand, Number(bid)];
            }
            // Full House
            const fhthree = hand.split('').filter((val, i, arr) => arr.filter(v => v === val).length === 3);
            const fhtwo = hand.split('').filter((val, i, arr) => arr.filter(v => v === val).length === 2);
            if (fhthree.length === 3 && fhtwo.length === 2) {
                return [2, hand, Number(bid)];
            }
            // Three of a kind
            const three = hand.split('').filter((val, i, arr) => arr.filter(v => v === val).length === 3);
            if (three.length === 3) {
                return [3, hand, Number(bid)];
            }
            // Two pairs
            const two = hand.split('').filter((val, i, arr) => arr.filter(v => v === val).length === 2);
            if (two.length === 4) {
                return [4, hand, Number(bid)];
            }
            // One pair
            const one = hand.split('').filter((val, i, arr) => arr.filter(v => v === val).length === 2);
            if (one.length === 2) {
                return [5, hand, Number(bid)]
            }
            // High card
            return [6, hand, Number(bid)];
        });
        // rank by [0] descending then sort by every of [1].split('').map(order.indexOf) descending
        out.sort((a, b) => {
            if (a[0] === b[0]) {
                const aorder = a[1].split('').map(item => order.indexOf(item));
                const border = b[1].split('').map(item => order.indexOf(item));
                for (let i = 0; i < aorder.length; i++) {
                    if (aorder[i] !== border[i]) {
                        return aorder[i] - border[i];
                    }
                }
                return 0;
            }
            return a[0] - b[0];
        }).reverse();

        return out.reduce((prev, curr, currIndex) => {
            prev += curr[2] * (currIndex + 1);
            return prev;
        }, 0)
        return 0;
    }
    secondPart(input: string): string | number {
        const order = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];
        const out = input.split('\n').map(game => {
            const [hand, bid] = game.split(' ');
            return testHand(hand, Number(bid));
        });
        // rank by [0] descending then sort by every of [1].split('').map(order.indexOf) descending
        out.sort((a, b) => {
            if (a[0] === b[0]) {
                const aorder = a[1].split('').map(item => order.indexOf(item));
                const border = b[1].split('').map(item => order.indexOf(item));
                for (let i = 0; i < aorder.length; i++) {
                    if (aorder[i] !== border[i]) {
                        return aorder[i] - border[i];
                    }
                }
                return 0;
            }
            return a[0] - b[0];
        }).reverse();

        Deno.writeTextFileSync('./test.json', JSON.stringify(out));
        return out.reduce((prev, curr, currIndex) => {
            prev += curr[2] * (currIndex + 1);
            return prev;
        }, 0)
    }
}

function testHand(hand: string, bid = 0): [number, string, number] {
    const countJ = hand.split('').filter(val => val === 'J').length;
    // Five of a kind 
    if (hand.split('').filter((val, i, arr) => arr.filter(v => v === val && v !== "J").length === 5 - countJ).length === 5 - countJ || countJ >= 4) {
        return [0, hand, bid];
    }
    // Four of a kind
    const four = hand.split('').filter((val, i, arr) => arr.filter(v => v === val && v !== "J").length === 4 - countJ);
    if (four.length === 4 - countJ || countJ === 3) {
        return [1, hand, bid];
    }
    // Full House
    if (countJ === 1) {
        const fh = hand.split('').filter((val, i, arr) => arr.filter(v => v === val && v !== "J").length === 2);
        if (fh.length === 4) {
            return [2, hand, bid]
        }
    } else {
        const fhthree = hand.split('').filter((val, i, arr) => arr.filter(v => v === val).length === 3);
        const fhtwo = hand.split('').filter((val, i, arr) => arr.filter(v => v === val).length === 2);
        if (fhthree.length === 3 && fhtwo.length === 2) {
            return [2, hand, bid];
        }
    }
    // Three of a kind
    const three = hand.split('').filter((val, i, arr) => arr.filter(v => v === val && v !== "J").length === 3 - countJ);
    if (three.length === 3 - countJ || countJ === 2) {
        return [3, hand, bid];
    }
    // Two pairs
    const two = hand.split('').filter((val, i, arr) => arr.filter(v => v === val).length === 2);
    if (two.length === 4) {
        return [4, hand, bid];
    }
    // One pair
    const one = hand.split('').filter((val, i, arr) => arr.filter(v => v === val && v !== "J").length === 2 - countJ);
    if (one.length === 2 - countJ || countJ === 1) {
        return [5, hand, bid]
    }
    // High card
    return [6, hand, bid];
}