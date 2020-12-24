console.log("Day 23, Puzzle 01!")

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

function linkedListToString(firstCup: Cup, separator: string, embrace?: Cup): string {
    let result = "";

    let limit = 0;
    let currentCup: Cup = firstCup;
    do {
        if (currentCup !== firstCup) {
            result += separator;
        }

        if (currentCup === embrace) {
            result += "(";
        }

        result += currentCup.label;

        if (currentCup === embrace) {
            result += ")";
        }

        currentCup = currentCup.safeNext();
        limit++;
    } while (currentCup !== firstCup && limit < 15);

    return result;
}

function main() {

    let cupLength: number;
    const cups: Cup[] = [];
    let firstCup: Cup;
    linereader.eachLine("./input/input.txt", (line, last) => {
        const numbers = line.split("");
        numbers.forEach(number => {
            cups.push(new Cup(parseInt(number)));
        });
        cupLength = cups.length;

        for (let i=0; i < cupLength; i++) {
            if (i === 0) {
                cups[i].previousCup = cups[cupLength - 1];
            } else {
                cups[i].previousCup = cups[i - 1];
            }

            cups[i].nextCup = cups[(i + 1) % cupLength];
        }

        firstCup = cups[0];
        let currentCup: Cup = firstCup;

        if (last) {
            let currentCupIndex = 0;
            let n1: Cup;
            let n2: Cup;
            let n3: Cup;
            let destinationCup: Cup;
            let destinationCupValue: number;
            for (let i=0; i < 100; i++) {
                currentCupIndex = i % cupLength;
                console.log("-- move " + (i + 1) + " --");
                console.log("cups: " + linkedListToString(firstCup, " ", currentCup));
                console.log("pick up: " + currentCup.safeNext().label + ", " + currentCup.safeNext().safeNext().label + ", " + currentCup.safeNext().safeNext().safeNext().label);
                console.log("");

                n1 = currentCup.safeNext();
                n2 = n1.safeNext();
                n3 = n2.safeNext();
                currentCup.nextCup = n3.safeNext();
                n3.safeNext().previousCup = currentCup;

                destinationCupValue = currentCup.label;
                do {
                    destinationCupValue--;
                    if (destinationCupValue === 0) {
                        destinationCupValue = 9;
                    }

                    destinationCup = currentCup.safeNext();
                    while (destinationCup.label !== destinationCupValue && destinationCup !== currentCup) {
                        destinationCup = destinationCup.safeNext();
                    }
                } while (destinationCup.label !== destinationCupValue);

                let tmpNext = destinationCup.safeNext();
                n1.previousCup = destinationCup;
                destinationCup.nextCup = n1;
                n3.nextCup = tmpNext;
                tmpNext.previousCup = n3;

                // find first cup relative to currentCup and currentCupIndex
                firstCup = currentCup;
                for (let j=0; j < currentCupIndex; j++) {
                    firstCup = firstCup.safePrev();
                }

                currentCup = currentCup.safeNext();
            }

            console.log("-- final --");
            console.log("cups: " + linkedListToString(firstCup, " ", currentCup));

            // for the result, locate the cup with value 1 and use as first cup
            while (firstCup.label !== 1) {
                firstCup = firstCup.safeNext();
            }
            console.log("Result: " + linkedListToString(firstCup, "").substring(1));
        }
    });
}

if (require.main === module) {
    main();
}

