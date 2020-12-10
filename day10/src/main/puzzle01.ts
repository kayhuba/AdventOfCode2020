console.log("Day 10, Puzzle 01!")

import linereader from "line-reader";

function main() {
    const adapterJoints: number[] = [];
    linereader.eachLine("./input/input.txt", (line, last) => {
        let current = parseInt(line);
        adapterJoints.push(current);

        if (last) {
            adapterJoints.sort((a, b) => a - b);

            const isOneDiff = (value1: number, value2: number): boolean => {
                return (value2 - value1) === 1;
            };

            const isThreeDiff = (value1: number, value2: number): boolean => {
                return (value2 - value1) === 3;
            };

            let numberOfOneDiff = 0;
            let numberOfThreeDiff = 1; // the last one is always a three-diff from adapter to the device as per spec
            let prev = 0;
            for (let i=0; i < adapterJoints.length; i++) {
                if (isOneDiff(prev, adapterJoints[i])) {
                    numberOfOneDiff++;
                } else if (isThreeDiff(prev, adapterJoints[i])) {
                    numberOfThreeDiff++;
                }
                prev = adapterJoints[i];
            }

            console.log("Result: " + numberOfOneDiff + " " + numberOfThreeDiff + " " + (numberOfOneDiff * numberOfThreeDiff));
        }
    });
}

if (require.main === module) {
    main();
}

