console.log("Day 15, Puzzle 02!")

import linereader from "line-reader";

function main() {
    const endCount = 30000000;
    let lastNumber = -1;
    const distinctNumberPositions: Uint32Array = new Uint32Array(new ArrayBuffer((endCount + 1) * 4));

    const updateNumberPosition = (number: number, position: number): number => {
        // console.log("Number: " + number);
        let nextNumber;

        if (distinctNumberPositions[number] !== 0) {
            nextNumber = position - distinctNumberPositions[number];
        } else {
            nextNumber = 0;
        }

        distinctNumberPositions[number] = position >>> 0;
        return nextNumber;
    };

    linereader.eachLine("./input/input.txt", (line, last) => {
        const initialNumbersRaw = line.split(",");
        let i;
        for (i=1; i <= initialNumbersRaw.length; i++) {
            let number = parseInt(initialNumbersRaw[i - 1]);
            lastNumber = updateNumberPosition(number, i);
        }

        for (; i < endCount; i++) {
            if (i % 1000000 === 0) {
                console.log("Position " + i);
            }

            lastNumber = updateNumberPosition(lastNumber, i);
        }

        console.log("Result: " + lastNumber);
    });
}

if (require.main === module) {
    main();
}

