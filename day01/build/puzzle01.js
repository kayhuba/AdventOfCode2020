"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Puzzle 01!");
var line_reader_1 = __importDefault(require("line-reader"));
var bigNumberArray = [];
var smallNumberArray = [];
line_reader_1.default.eachLine("./input/input.txt", function (line, last) {
    var current = parseInt(line);
    if (current >= 1010) {
        bigNumberArray.push(current);
    }
    else {
        smallNumberArray.push(current);
    }
    if (last) {
        var n = smallNumberArray.length;
        for (var i = 0; i < n; i++) {
            var m = bigNumberArray.length;
            for (var j = 0; j < m; j++) {
                if (smallNumberArray[i] + bigNumberArray[j] === 2020) {
                    console.log("Riddle solution: " + (smallNumberArray[i] * bigNumberArray[j]));
                }
            }
        }
    }
});
//# sourceMappingURL=puzzle01.js.map