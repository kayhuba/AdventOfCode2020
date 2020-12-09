console.log("Day 09, Puzzle 01!")

import linereader from "line-reader";

function findSum(sum: number, summands: number[]): boolean {
    let i=0;
    let j=0;
    const preamble = summands.length;

    for (; i < preamble; i++) {
        for (j=0; j < preamble; j++) {
            if (j === i) {
                continue;
            }

            if (summands[i] + summands[j] === sum) {
                return true;
            }
        }
    }

    return false;
}

function main() {
    const preambleLength = 5;
    const ringBuffer: number[] = [];
    let loadingCount = 0;
    let start = 0;
    let end = 0;
    linereader.eachLine("./input/input.txt", (line, last) => {
        let current = parseInt(line);

        if (loadingCount < preambleLength) {
            ringBuffer[loadingCount++] = current;
        } else {

            if (!findSum(current, ringBuffer)) {
                console.log("Result: " + current);
                process.exit();
            }

            ringBuffer[end] = current;

            start = (start + 1) % preambleLength;
        }

        end = (end + 1) % preambleLength;
    });
}

if (require.main === module) {
    main();
}

