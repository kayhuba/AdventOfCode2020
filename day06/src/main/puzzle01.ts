console.log("Day 06, Puzzle 01!")

import linereader from "line-reader";

export function readBlock(line: string, currentGroup: any): boolean {
    if (!line) {
        return true;
    }

    let n=line.length;
    for (let i=0; i < n; i++) {
        currentGroup[line.charAt(i)] = true;
    }

    return false;
}

function main() {
    let yesCountSum = 0;
    let currentGroup = {};
    linereader.eachLine("./input/input.txt", (line, last) => {
        let blockComplete = readBlock(line, currentGroup);

        let processBlock = (block: any): number => {
            return Object.keys(block).length;
        };

        if (blockComplete) {
            yesCountSum += processBlock(currentGroup);
            currentGroup = {};
        }

        if (last) {
            yesCountSum += processBlock(currentGroup);

            console.log("Result: " + yesCountSum);
        }
    });
}

if (require.main === module) {
    main();
}

