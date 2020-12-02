console.log("Day 02, Puzzle 02!")

import linereader from "line-reader";

export function handleLine(line: string): number {
    const linePattern = /^(\d+)-(\d+) (\w): (.*)$/

    const groups = linePattern.exec(line);
    if (groups) {
        const indexOne = parseInt(groups[1]);
        const indexTwo = parseInt(groups[2]);
        const character = groups[3];
        const password = groups[4];

        if ((password.charAt(indexOne - 1) === character && password.charAt(indexTwo - 1) !== character) ||
            (password.charAt(indexOne - 1) !== character && password.charAt(indexTwo - 1) === character)) {
            console.log("Valid: " + line);
            return 1;
        }
    }

    return 0;
}

function main() {
    let validPasswords = 0;
    linereader.eachLine("./input/input.txt", (line, last) => {
        validPasswords += handleLine(line);

        if (last) {
            console.log("Result: " + validPasswords);
        }
    });
}

if (require.main === module) {
    main();
}

