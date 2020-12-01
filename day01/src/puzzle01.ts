console.log("Puzzle 01!")

import linereader from "line-reader";

const bigNumberArray : number[] = [];
const smallNumberArray : number[] = [];

linereader.eachLine("./input/input.txt", (line, last) => {
    const current = parseInt(line);
    if (current >= 1010) {
        bigNumberArray.push(current);
    } else {
        smallNumberArray.push(current);
    }

    if (last) {
        const n = smallNumberArray.length;
        for (let i=0; i < n; i++) {
            const m = bigNumberArray.length;
            for (let j=0; j < m; j++) {
                if (smallNumberArray[i] + bigNumberArray[j] === 2020) {
                    console.log("Riddle solution: " + (smallNumberArray[i] * bigNumberArray[j]));
                }
            }
        }
    }
});

