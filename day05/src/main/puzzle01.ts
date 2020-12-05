console.log("Day 05, Puzzle 01!")

import linereader from "line-reader";

export function readLine(line: string): number {
    let approacher = (input: string, lowerHalfIndicator: string, upperLimit: number): number => {
        let upper = upperLimit;
        let lower = 0;
        for (let i=0; i < input.length; i++) {
            if (input.charAt(i) === lowerHalfIndicator) {
                upper = upper - (upper - lower + 1) / 2;
            } else {
                lower = lower + (upper - lower + 1) / 2;
            }
        }

        return upper;
    };

    let row = approacher(line.substring(0, 7), "F", 127);
    let column = approacher(line.substring(7), "L", 7);
    return row * 8 + column;
}

function main() {
    let maxSeatId = -1;
    linereader.eachLine("./input/input.txt", (line, last) => {
        maxSeatId = Math.max(readLine(line), maxSeatId);

        if (last) {
            console.log("Result: " + maxSeatId);
        }
    });
}

if (require.main === module) {
    main();
}

