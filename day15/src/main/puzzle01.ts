console.log("Day 15, Puzzle 01!")

import linereader from "line-reader";

interface NumberPosition {
    [number: number]: number;
}

function main() {
    let lastNumber = -1;
    const distinctNumberPositions: NumberPosition = {};

    const updateNumberPosition = (number: number, position: number): number => {
        console.log("Number: " + number);
        if (typeof distinctNumberPositions[number] !== "undefined") {
            let nextNumber = position - distinctNumberPositions[number];
            distinctNumberPositions[number] = position;
            return nextNumber;
        } else {
            distinctNumberPositions[number] = position;
            return 0;
        }
    };

    linereader.eachLine("./input/input.txt", (line, last) => {
        const initialNumbersRaw = line.split(",");
        let i;
        for (i=0; i < initialNumbersRaw.length; i++) {
            let number = parseInt(initialNumbersRaw[i]);
            lastNumber = updateNumberPosition(number, i);
        }

        for (; i < 2019; i++) {
            lastNumber = updateNumberPosition(lastNumber, i);
        }

        console.log("Result: " + lastNumber + " " + Object.keys(distinctNumberPositions).length);
    });
}

if (require.main === module) {
    main();
}

