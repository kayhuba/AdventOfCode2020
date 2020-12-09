"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 09, Puzzle 02!");
var line_reader_1 = __importDefault(require("line-reader"));
function findSum(sum, summands, summandOffset) {
    var testSum = summands[summandOffset];
    var min = testSum;
    var max = testSum;
    for (var i = summandOffset + 1; i < summands.length && testSum < sum; i++) {
        min = Math.min(min, summands[i]);
        max = Math.max(max, summands[i]);
        testSum += summands[i];
    }
    if (testSum === sum) {
        return min + max;
    }
    return 0;
}
function main() {
    var preambleLength = 25;
    // const noSumResult = 127;
    var noSumResult = 177777905;
    var fullBuffer = [];
    line_reader_1.default.eachLine("./input/input.txt", function (line, last) {
        var current = parseInt(line);
        fullBuffer.push(current);
        if (last) {
            for (var i = 0; i < fullBuffer.length - preambleLength; i++) {
                var weakness = findSum(noSumResult, fullBuffer, i);
                if (weakness) {
                    console.log("Result: " + weakness);
                    return;
                }
            }
        }
    });
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=puzzle02.js.map