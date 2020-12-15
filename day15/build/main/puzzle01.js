"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 15, Puzzle 01!");
const line_reader_1 = __importDefault(require("line-reader"));
function main() {
    let lastNumber = -1;
    const distinctNumberPositions = {};
    const updateNumberPosition = (number, position) => {
        console.log("Number: " + number);
        if (typeof distinctNumberPositions[number] !== "undefined") {
            let nextNumber = position - distinctNumberPositions[number];
            distinctNumberPositions[number] = position;
            return nextNumber;
        }
        else {
            distinctNumberPositions[number] = position;
            return 0;
        }
    };
    line_reader_1.default.eachLine("./input/input.txt", (line, last) => {
        const initialNumbersRaw = line.split(",");
        let i;
        for (i = 0; i < initialNumbersRaw.length; i++) {
            let number = parseInt(initialNumbersRaw[i]);
            lastNumber = updateNumberPosition(number, i);
        }
        for (; i < 2019; i++) {
            lastNumber = updateNumberPosition(lastNumber, i);
        }
        console.log("Result: " + lastNumber + " " + Object.keys(distinctNumberPositions).length);
    });
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=puzzle01.js.map