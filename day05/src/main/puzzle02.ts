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
    let seats: boolean[] = [];
    for (let i=0; i < 128 * 8; i++) {
        seats.push(false);
    }

    linereader.eachLine("./input/input.txt", (line, last) => {
        let seatId = readLine(line);
        seats[seatId] = true;

        if (last) {
            let startPointFound = false;
            for (let i=1; i < 128 * 8 - 1; i++) {
                if (!startPointFound) {
                    startPointFound = seats[i];
                    continue;
                }

                if (startPointFound && !seats[i]) {
                    console.log("Result: " + i);
                    break;
                }
            }
        }
    });
}

if (require.main === module) {
    main();
}

