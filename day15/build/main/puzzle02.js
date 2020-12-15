"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 15, Puzzle 02!");
const line_reader_1 = __importDefault(require("line-reader"));
function main() {
    const endCount = 30000000;
    let lastNumber = -1;
    const distinctNumberPositions = new Uint32Array(new ArrayBuffer((endCount + 1) * 4));
    const updateNumberPosition = (number, position) => {
        // console.log("Number: " + number);
        let nextNumber;
        if (distinctNumberPositions[number] !== 0) {
            nextNumber = position - distinctNumberPositions[number];
        }
        else {
            nextNumber = 0;
        }
        distinctNumberPositions[number] = position >>> 0;
        return nextNumber;
    };
    line_reader_1.default.eachLine("./input/input.txt", (line, last) => {
        const initialNumbersRaw = line.split(",");
        let i;
        for (i = 1; i <= initialNumbersRaw.length; i++) {
            let number = parseInt(initialNumbersRaw[i - 1]);
            lastNumber = updateNumberPosition(number, i);
        }
        for (; i < endCount; i++) {
            if (i % 1000000 === 0) {
                console.log("Position " + i);
            }
            lastNumber = updateNumberPosition(lastNumber, i);
        }
        console.log("Result: " + lastNumber);
    });
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=puzzle02.js.map