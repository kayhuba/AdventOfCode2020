"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readBlock = void 0;
console.log("Day 05, Puzzle 02!");
var line_reader_1 = __importDefault(require("line-reader"));
function readBlock(line, currentGroup) {
    if (!line) {
        return true;
    }
    currentGroup.personCount++;
    var n = line.length;
    for (var i = 0; i < n; i++) {
        if (typeof currentGroup.groupYesVotes[line.charAt(i)] === "undefined") {
            currentGroup.groupYesVotes[line.charAt(i)] = 1;
        }
        else {
            currentGroup.groupYesVotes[line.charAt(i)]++;
        }
    }
    return false;
}
exports.readBlock = readBlock;
function main() {
    var yesCountSum = 0;
    var currentGroup = {
        personCount: 0,
        groupYesVotes: {}
    };
    line_reader_1.default.eachLine("./input/input.txt", function (line, last) {
        var blockComplete = readBlock(line, currentGroup);
        var processBlock = function (group) {
            var count = 0;
            Object.values(group.groupYesVotes).forEach(function (votes) { if (votes === group.personCount)
                count++; });
            return count;
        };
        if (blockComplete) {
            yesCountSum += processBlock(currentGroup);
            currentGroup = {
                personCount: 0,
                groupYesVotes: {}
            };
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
//# sourceMappingURL=puzzle02.js.map