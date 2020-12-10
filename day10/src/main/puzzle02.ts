console.log("Day 10, Puzzle 02!")

import linereader from "line-reader";

function main() {
    const adapterJoints: number[] = [0];
    linereader.eachLine("./input/input.txt", (line, last) => {
        let current = parseInt(line);
        adapterJoints.push(current);

        if (last) {
            adapterJoints.sort((a, b) => a - b);
            adapterJoints.push(adapterJoints[adapterJoints.length - 1] + 3);

            let combinations = 0;
            let combinationStack: number[] = [0];
            const canSkipNext = (current: number, nextNext: number): boolean => {
                return nextNext - current < 3;
            };

            const canSkipNextNext = (current: number, nextNextNext: number): boolean => {
                return nextNextNext - current <= 3;
            };

            for (let i=adapterJoints.length - 4; i >= 0; i--) {
                if (canSkipNext(adapterJoints[i], adapterJoints[i + 2])) {
                    combinations++;
                    if (combinationStack.length > 2) {
                        combinations += combinationStack[combinationStack.length - 2];
                    }
                }

                if (i < adapterJoints.length - 3 && canSkipNextNext(adapterJoints[i], adapterJoints[i + 3])) {
                    combinations++;
                    if (combinationStack.length > 3) {
                        combinations += combinationStack[combinationStack.length - 3];
                    }
                }

                combinationStack.push(combinations);
            }

            console.log("Result: " + (combinations + 1));
        }
    });
}

if (require.main === module) {
    main();
}

