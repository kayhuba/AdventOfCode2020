console.log("Day 07, Puzzle 01!")

import linereader from "line-reader";

interface BagContentDescription {
    bag: Bag,
    amount: number
}

class Bag {
    name: string;
    contents: BagContentDescription[] | undefined;

    constructor(name: string) {
        this.name = name;
    }
}

interface KnownBagMap {
    [name: string]: Bag
}

function extractNameFromBagDescription(bagDescription: string): string {
    return bagDescription.substring(0, bagDescription.lastIndexOf(" "));
}

function readBagDefinition(bagDefinition: string, knownBags: KnownBagMap): Bag {
    let nameContentPair = bagDefinition.split(" contain ");

    const bagName = extractNameFromBagDescription(nameContentPair[0]);
    let bag: Bag = knownBags[bagName];
    if (!bag) {
        bag = new Bag(bagName);
        knownBags[bagName] = bag;
    }

    bag.contents = [];
    if (nameContentPair[1] !== "no other bags.") {
        let contents = nameContentPair[1].split(", ");
        contents.forEach((bagContentElement: string) => {
            // @ts-ignore
            const amount = parseInt(bagContentElement.match(/^(\d+) .+$/)[1]);
            const bagName = extractNameFromBagDescription(bagContentElement.substring(bagContentElement.indexOf(" ") + 1));
            let containedBag = knownBags[bagName];
            if (!containedBag) {
                containedBag = new Bag(bagName);
                knownBags[bagName] = containedBag;
            }

            let bagContent: BagContentDescription = {
                amount: amount,
                bag: containedBag
            };

            // @ts-ignore
            bag.contents.push(bagContent);
        });
    }

    return bag;
}

function countBagsContained(bag: Bag, bagSubjectName: string): number {
    let count = (bag.name === bagSubjectName) ? 1 : 0;

    // @ts-ignore
    bag.contents.forEach(bagContentDescription => {
            count += countBagsContained(bagContentDescription.bag, bagSubjectName) * bagContentDescription.amount;
    });

    return count;
}

function main() {
    const knownBags: KnownBagMap = {};
    linereader.eachLine("./input/input.txt", (line, last) => {
        readBagDefinition(line, knownBags);

        if (last) {
            const subjectName = "shiny gold";
            let count = 0;
            Object.entries(knownBags).forEach(bagEntry => {
                if (bagEntry[0] !== subjectName && countBagsContained(bagEntry[1], subjectName) > 0) {
                    count++;
                }
            });

            console.log("Result: " + count);
        }
    });
}

if (require.main === module) {
    main();
}

