"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readLine = void 0;
console.log("Day 05, Puzzle 01!");
var line_reader_1 = __importDefault(require("line-reader"));
function readLine(line) {
    var approacher = function (input, lowerHalfIndicator, upperLimit) {
        var upper = upperLimit;
        var lower = 0;
        for (var i = 0; i < input.length; i++) {
            if (input.charAt(i) === lowerHalfIndicator) {
                upper = upper - (upper - lower + 1) / 2;
            }
            else {
                lower = lower + (upper - lower + 1) / 2;
            }
        }
        return upper;
    };
    var row = approacher(line.substring(0, 7), "F", 127);
    var column = approacher(line.substring(7), "L", 7);
    return row * 8 + column;
}
exports.readLine = readLine;
function main() {
    var seats = [];
    for (var i = 0; i < 128 * 8; i++) {
        seats.push(false);
    }
    line_reader_1.default.eachLine("./input/input.txt", function (line, last) {
        var seatId = readLine(line);
        seats[seatId] = true;
        if (last) {
            var startPointFound = false;
            for (var i = 1; i < 128 * 8 - 1; i++) {
                if (!startPointFound) {
                    startPointFound = seats[i];
                    continue;
                }
                if (startPointFound && !seats[i]) {
                    console.log("Result: " + i);
                    break;
                }
            }
        }
    });
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=puzzle02.js.map