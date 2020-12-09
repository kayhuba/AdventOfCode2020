"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 09, Puzzle 01!");
var line_reader_1 = __importDefault(require("line-reader"));
function findSum(sum, summands, summandOffset, preambleLength) {
    var i = 0;
    for (; i < preambleLength; i++) {
        for (var j = 0; j < preambleLength; j++) {
            if (j === i) {
                continue;
            }
            if (summands[i + summandOffset] + summands[j + summandOffset] === sum) {
                return true;
            }
        }
    }
    return false;
}
function main() {
    var preambleLength = 25;
    var fullBuffer = [];
    line_reader_1.default.eachLine("./input/input.txt", function (line, last) {
        var current = parseInt(line);
        fullBuffer.push(current);
        if (last) {
            for (var i = 0; i < fullBuffer.length - preambleLength; i++) {
                if (!findSum(fullBuffer[i + preambleLength], fullBuffer, i, preambleLength)) {
                    console.log("Result: " + fullBuffer[i + preambleLength]);
                    return;
                }
            }
        }
    });
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=puzzle01.js.map