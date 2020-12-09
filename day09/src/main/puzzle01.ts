console.log("Day 09, Puzzle 01!")

import linereader from "line-reader";

function findSum(sum: number, summands: number[], summandOffset: number, preambleLength: number): boolean {
    let i=0;
    for (; i < preambleLength; i++) {
        for (let j=0; j < preambleLength; j++) {
            if (j === i) {
                continue;
            }

            if (summands[i + summandOffset] + summands[j + summandOffset] === sum) {
                return true;
            }
        }
    }

    return false;
}

function main() {
    const preambleLength = 25;
    const fullBuffer: number[] = [];

    linereader.eachLine("./input/input.txt", (line, last) => {
        let current = parseInt(line);
        fullBuffer.push(current);

        if (last) {
            for (let i=0; i < fullBuffer.length - preambleLength; i++) {
                if (!findSum(fullBuffer[i + preambleLength], fullBuffer, i, preambleLength)) {
                    console.log("Result: " + fullBuffer[i + preambleLength]);
                    return;
                }
            }
        }
    });
}

if (require.main === module) {
    main();
}

