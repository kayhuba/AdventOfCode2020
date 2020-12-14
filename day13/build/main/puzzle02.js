"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 13, Puzzle 02!");
const line_reader_1 = __importDefault(require("line-reader"));
function main() {
    let firstLine = true;
    const busIds = [];
    line_reader_1.default.eachLine("./input/input.txt", (line, last) => {
        if (firstLine) {
            firstLine = false;
            return;
        }
        let offset = 0n;
        const busIdsSortedDecreasing = [];
        const busIdsWithInvalid = line.split(",");
        busIdsWithInvalid.forEach(busIdsWithInvalid => {
            let id;
            if (busIdsWithInvalid === "x") {
                id = 0n;
            }
            else {
                id = BigInt(parseInt(busIdsWithInvalid));
                busIdsSortedDecreasing.push({ id: id, offset: offset });
            }
            busIds.push(id);
            offset++;
        });
        busIdsSortedDecreasing.sort((a, b) => Number(b.id - a.id));
        const checkConstraints = (ref, level) => {
            for (let i = 1; i < (level + 1); i++) {
                if ((ref + busIdsSortedDecreasing[i].offset) % busIdsSortedDecreasing[i].id !== 0n) {
                    return false;
                }
                console.log("Match with factors (" + (busIdsSortedDecreasing[0].id) + " * " + (ref + busIdsSortedDecreasing[0].offset) / busIdsSortedDecreasing[0].id + ") and (" + busIdsSortedDecreasing[i].id + " * " + (ref + busIdsSortedDecreasing[i].offset) / busIdsSortedDecreasing[i].id + ")");
            }
            return true;
        };
        let additionToMultiple = 1n;
        let multiple = 0n;
        const base = busIdsSortedDecreasing[0].id - busIdsSortedDecreasing[0].offset;
        for (let level = 1; level < busIdsSortedDecreasing.length; level++) {
            while (!checkConstraints(base + (multiple * busIdsSortedDecreasing[0].id), level)) {
                multiple += additionToMultiple;
            }
            additionToMultiple = additionToMultiple * busIdsSortedDecreasing[level].id;
        }
        console.log("Result: " + ((multiple + 1n) * busIdsSortedDecreasing[0].id - busIdsSortedDecreasing[0].offset));
    });
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=puzzle02.js.map