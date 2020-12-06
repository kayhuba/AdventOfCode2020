console.log("Day 05, Puzzle 02!")

import linereader from "line-reader";

interface Group {
    personCount: number;
    groupYesVotes: any;
}

export function readBlock(line: string, currentGroup: Group): boolean {
    if (!line) {
        return true;
    }

    currentGroup.personCount++;

    let n=line.length;
    for (let i=0; i < n; i++) {
        if (typeof currentGroup.groupYesVotes[line.charAt(i)] === "undefined") {
            currentGroup.groupYesVotes[line.charAt(i)] = 1;
        } else {
            currentGroup.groupYesVotes[line.charAt(i)]++;
        }
    }

    return false;
}

function main() {
    let yesCountSum = 0;
    let currentGroup: Group = {
        personCount: 0,
        groupYesVotes: {}
    };

    linereader.eachLine("./input/input.txt", (line, last) => {
        let blockComplete = readBlock(line, currentGroup);

        let processBlock = (group: Group): number => {
            let count = 0;
            Object.values(group.groupYesVotes).forEach(votes => {if (votes === group.personCount) count++});
            return count;
        };

        if (blockComplete) {
            yesCountSum += processBlock(currentGroup);
            currentGroup = {
                personCount: 0,
                groupYesVotes: {}
            };
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

