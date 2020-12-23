console.log("Day 23, Puzzle 01!")

import linereader from "line-reader";

function main() {

    let cupLength: number;
    const cups: number[] = [];
    linereader.eachLine("./input/input.txt", (line, last) => {
        const numbers = line.split("");
        numbers.forEach(number => {
            cups.push(parseInt(number));
        });
        cupLength = cups.length;

        if (last) {
            let currentCupIndex = 0;
            let n1, n2, n3;
            let targetCup;
            for (let i=0; i < 100; i++) {
                currentCupIndex = i % cupLength;
                n1 = cups.splice((currentCupIndex + 1) % cupLength, 1)[0];
                n2 = cups.splice((currentCupIndex + 1) % cupLength, 1)[0];
                n3 = cups.splice((currentCupIndex + 1) % cupLength, 1)[0];

                targetCup = cups[currentCupIndex];
                do {
                    targetCup--;
                    if (targetCup === 0) {
                        targetCup = 9;
                    }
                } while (!cups.includes(targetCup));

                let targetCupIndex = cups.indexOf(targetCup);
                if (targetCupIndex < 1) {
                    cups.splice(cupLength - 1, 0, cups.splice(0, 1, n3)[0]);
                }
                if (targetCupIndex < 2) {
                    cups.splice(cupLength - 1, 0, cups.splice(0, 1, n2)[0]);
                }
                if (targetCupIndex < 3) {
                    cups.splice(cupLength - 1, 0, cups.splice(0, 1, n1)[0]);
                }
                if (targetCupIndex >= 3) {
                    cups.splice((targetCupIndex + 1) % cupLength, 0, n3);
                    cups.splice((targetCupIndex + 1) % cupLength, 0, n2);
                    cups.splice((targetCupIndex + 1) % cupLength, 0, n1);
                }
                console.log("After round " + (i + 1) + ": " + cups.join(" "));
            }

            console.log("Result: " + cups.join(""));
        }
    });
}

if (require.main === module) {
    main();
}

