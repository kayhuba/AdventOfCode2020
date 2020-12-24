console.log("Day 24, Puzzle 02!")

import linereader from "line-reader";

function main() {

    linereader.eachLine("./input/input.txt", (line, last) => {
        if (last) {
            console.log("Result: ");
        }
    });
}

if (require.main === module) {
    main();
}

