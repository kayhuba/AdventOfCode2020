console.log("Day 09, Puzzle 02!")

import linereader from "line-reader";

function findSum(sum: number, summands: number[], summandOffset: number): number {
    let testSum = summands[summandOffset];
    let min = testSum;
    let max = testSum;

    for (let i=summandOffset + 1; i < summands.length && testSum < sum; i++) {
        min = Math.min(min, summands[i]);
        max = Math.max(max, summands[i]);
        testSum += summands[i];
    }

    if (testSum === sum) {
        return min + max;
    }

    return 0;
}

function main() {
    const preambleLength = 25;
    // const noSumResult = 127;
    const noSumResult = 177777905;
    const fullBuffer: number[] = [];

    linereader.eachLine("./input/input.txt", (line, last) => {
        let current = parseInt(line);
        fullBuffer.push(current);

        if (last) {
            for (let i=0; i < fullBuffer.length - preambleLength; i++) {
                let weakness = findSum(noSumResult, fullBuffer, i);
                if (weakness) {
                    console.log("Result: " + weakness);
                    return;
                }
            }
        }
    });
}

if (require.main === module) {
    main();
}

