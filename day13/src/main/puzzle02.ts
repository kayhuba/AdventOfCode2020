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

        const checkConstraints = (ref: bigint, level: number): boolean => {
            busIdCheckStats[0]++;
            for (let i=1; i < (level + 1); i++) {
                busIdCheckStats[i]++;
                if ((ref + busIdsSortedDecreasing[i].offset) % busIdsSortedDecreasing[i].id !== 0n) {
                    return false;
                }

                console.log("Match with factors (" + (busIdsSortedDecreasing[0].id) + " * " + (ref + busIdsSortedDecreasing[0].offset) / busIdsSortedDecreasing[0].id + ") and (" + busIdsSortedDecreasing[i].id + " * " + (ref + busIdsSortedDecreasing[i].offset) / busIdsSortedDecreasing[i].id + ")")
            }

            return true;
        };

        let additionToMultiple: bigint = 1n;
        let multiple: bigint = 0n;
        const base = busIdsSortedDecreasing[0].id - busIdsSortedDecreasing[0].offset;
        for (let level=1; level < busIdsSortedDecreasing.length; level++) {
            while (!checkConstraints(base + (multiple * busIdsSortedDecreasing[0].id), level)) {
                multiple += additionToMultiple;
            }

            additionToMultiple = additionToMultiple * busIdsSortedDecreasing[level].id;
        }

        console.log("Result: " + ((multiple + 1n) * busIdsSortedDecreasing[0].id - busIdsSortedDecreasing[0].offset));
    });
}

if (require.main === module) {
    main();
}

