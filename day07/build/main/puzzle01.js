"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 07, Puzzle 01!");
var line_reader_1 = __importDefault(require("line-reader"));
var Bag = /** @class */ (function () {
    function Bag(name) {
        this.name = name;
    }
    return Bag;
}());
function extractNameFromBagDescription(bagDescription) {
    return bagDescription.substring(0, bagDescription.lastIndexOf(" "));
}
function readBagDefinition(bagDefinition, knownBags) {
    var nameContentPair = bagDefinition.split(" contain ");
    var bagName = extractNameFromBagDescription(nameContentPair[0]);
    var bag = knownBags[bagName];
    if (!bag) {
        bag = new Bag(bagName);
        knownBags[bagName] = bag;
    }
    bag.contents = [];
    if (nameContentPair[1] !== "no other bags.") {
        var contents = nameContentPair[1].split(", ");
        contents.forEach(function (bagContentElement) {
            // @ts-ignore
            var amount = parseInt(bagContentElement.match(/^(\d+) .+$/)[1]);
            var bagName = extractNameFromBagDescription(bagContentElement.substring(bagContentElement.indexOf(" ") + 1));
            var containedBag = knownBags[bagName];
            if (!containedBag) {
                containedBag = new Bag(bagName);
                knownBags[bagName] = containedBag;
            }
            var bagContent = {
                amount: amount,
                bag: containedBag
            };
            // @ts-ignore
            bag.contents.push(bagContent);
        });
    }
    return bag;
}
function countBagsContained(bag, bagSubjectName) {
    var count = (bag.name === bagSubjectName) ? 1 : 0;
    // @ts-ignore
    bag.contents.forEach(function (bagContentDescription) {
        count += countBagsContained(bagContentDescription.bag, bagSubjectName) * bagContentDescription.amount;
    });
    return count;
}
function main() {
    var knownBags = {};
    line_reader_1.default.eachLine("./input/input.txt", function (line, last) {
        readBagDefinition(line, knownBags);
        if (last) {
            var subjectName_1 = "shiny gold";
            var count_1 = 0;
            Object.entries(knownBags).forEach(function (bagEntry) {
                if (bagEntry[0] !== subjectName_1 && countBagsContained(bagEntry[1], subjectName_1) > 0) {
                    count_1++;
                }
            });
            console.log("Result: " + count_1);
        }
    });
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=puzzle01.js.map