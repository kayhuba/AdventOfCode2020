console.log("Day 13, Puzzle 02!")

import linereader from "line-reader";

interface BusIdAndOffset {
    id: bigint;
    offset: bigint;
}

function main() {
    let firstLine = true;
    const busIds: bigint[] = [];
    linereader.eachLine("./input/input.txt", (line, last) => {
        if (firstLine) {
            firstLine = false;
            return;
        }

        const busIdCheckStats: number[] = [];

        let offset = 0n;
        const busIdsSortedDecreasing: BusIdAndOffset[] = [];
        const busIdsWithInvalid: string[] = line.split(",");
        busIdsWithInvalid.forEach(busIdsWithInvalid => {
            let id: bigint;
            if (busIdsWithInvalid === "x") {
                id = 0n;
            } else {
                id = BigInt(parseInt(busIdsWithInvalid));
                busIdsSortedDecreasing.push({id: id, offset: offset});
                busIdCheckStats.push(0);
            }
            busIds.push(id);
            offset++;
        });

        busIdsSortedDecreasing.sort((a, b) => Number(b.id - a.id));
        const busIdCount = busIdsSortedDecreasing.length;
        const checkConstraints = (ref: bigint): boolean => {
            busIdCheckStats[0]++;
            for (let i=1; i < busIdCount; i++) {
                busIdCheckStats[i]++;
                if ((ref + busIdsSortedDecreasing[i].offset) % busIdsSortedDecreasing[i].id !== 0n) {
                    return false;
                }
            }

            return true;
        };

        let baseRef = busIdsSortedDecreasing[0].id - busIdsSortedDecreasing[0].offset;
        while (!checkConstraints(baseRef)) {
            baseRef+=busIdsSortedDecreasing[0].id;

            if (baseRef % 1000000n === 0n) {
                console.log("No result with multiplier " + baseRef + " stats: " + busIdCheckStats);
            }
        }

        console.log("Result: " + (baseRef));
    });
}

if (require.main === module) {
    main();
}

