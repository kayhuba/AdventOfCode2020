"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readBlock = void 0;
console.log("Day 06, Puzzle 01!");
var line_reader_1 = __importDefault(require("line-reader"));
function readBlock(line, currentGroup) {
    if (!line) {
        return true;
    }
    var n = line.length;
    for (var i = 0; i < n; i++) {
        currentGroup[line.charAt(i)] = true;
    }
    return false;
}
exports.readBlock = readBlock;
function main() {
    var yesCountSum = 0;
    var currentGroup = {};
    line_reader_1.default.eachLine("./input/input.txt", function (line, last) {
        var blockComplete = readBlock(line, currentGroup);
        var processBlock = function (block) {
            return Object.keys(block).length;
        };
        if (blockComplete) {
            yesCountSum += processBlock(currentGroup);
            currentGroup = {};
        }
        if (last) {
            yesCountSum += processBlock(currentGroup);
            console.log("Result: " + yesCountSum);
        }
    });
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=puzzle01.js.map