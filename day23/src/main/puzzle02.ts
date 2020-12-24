console.log("Day 23, Puzzle 02!")

import linereader from "line-reader";

class Cup {
    label: number;
    previousCup: Cup | undefined;
    nextCup: Cup | undefined;

    constructor(value: number) {
        this.label = value;
    }

    safeNext(): Cup {
        if (!this.nextCup) {
            throw new Error("somehow next cup is not available");
        }

        return this.nextCup;
    }

    safePrev(): Cup {
        if (!this.previousCup) {
            throw new Error("somehow previous cup is not available");
        }

        return this.previousCup;
    }
}

function main() {

    let cupLength: number;
    const labelIndex: Cup[] = new Array(1000000);
    const cups: Cup[] = [];
    linereader.eachLine("./input/input.txt", (line, last) => {
        const numbers = line.split("");
        let maxNumber = 0;
        numbers.forEach(number => {
            maxNumber = Math.max(maxNumber, parseInt(number));
            let label = parseInt(number);
            let cup = new Cup(label);
            labelIndex[label - 1] = cup;
            cups.push(cup);
        });
        for (let i=maxNumber + 1; i <= 1000000; i++) {
            let cup = new Cup(i);
            labelIndex[i - 1] = cup;
            cups.push(cup);
        }
        cupLength = cups.length;

        for (let i=0; i < cupLength; i++) {
            if (i === 0) {
                cups[i].previousCup = cups[cupLength - 1];
            } else {
                cups[i].previousCup = cups[i - 1];
            }

            cups[i].nextCup = cups[(i + 1) % cupLength];
        }

        let currentCup: Cup = cups[0];

        if (last) {
            let n1: Cup;
            let n2: Cup;
            let n3: Cup;
            let destinationCup: Cup;
            let destinationCupValue: number;
            for (let i=0; i < 10000000; i++) {
                if (i % 100000 === 0) {
                    console.log("Move " + i);
                }

                n1 = currentCup.safeNext();
                n2 = n1.safeNext();
                n3 = n2.safeNext();
                currentCup.nextCup = n3.safeNext();
                n3.safeNext().previousCup = currentCup;

                destinationCupValue = currentCup.label;
                do {
                    destinationCupValue--;
                    if (destinationCupValue === 0) {
                        destinationCupValue = cups.length;
                    }

                    destinationCup = labelIndex[destinationCupValue - 1];
                } while (destinationCup === n1 || destinationCup === n2 || destinationCup === n3);

                let tmpNext = destinationCup.safeNext();
                n1.previousCup = destinationCup;
                destinationCup.nextCup = n1;
                n3.nextCup = tmpNext;
                tmpNext.previousCup = n3;

                currentCup = currentCup.safeNext();
            }

            // for the result, locate the cup with value 1 and use as first cup
            while (currentCup.label !== 1) {
                currentCup = currentCup.safeNext();
            }

            const firstAfterCup1 = currentCup.safeNext().label;
            const secondAfterCup2 = currentCup.safeNext().safeNext().label;
            console.log("First after cup 1:  " + firstAfterCup1);
            console.log("Second after cup 1: " + secondAfterCup2);

            console.log("Result: " + (firstAfterCup1 * secondAfterCup2));
        }
    });
}

if (require.main === module) {
    main();
}

