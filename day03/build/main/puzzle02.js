"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.travelSlope = exports.isTreeAt = exports.readLine = void 0;
console.log("Day 03, Puzzle 02!");
var line_reader_1 = __importDefault(require("line-reader"));
function readLine(line) {
    var treeLine = [];
    var n = line.length;
    for (var i = 0; i < n; i++) {
        if (line.charAt(i) === "#") {
            treeLine.push(true);
        }
        else {
            treeLine.push(false);
        }
    }
    return treeLine;
}
exports.readLine = readLine;
function isTreeAt(geologyGrid, x, y) {
    var modulo = geologyGrid[y].length;
    return geologyGrid[y][x % modulo];
}
exports.isTreeAt = isTreeAt;
function travelSlope(geologyGrid, travelX, travelY) {
    var x = 0;
    var y = 0;
    var treeCount = 0;
    while (y < geologyGrid.length) {
        if (isTreeAt(geologyGrid, x, y)) {
            treeCount++;
        }
        x += travelX;
        y += travelY;
    }
    return treeCount;
}
exports.travelSlope = travelSlope;
function main() {
    var geologyGrid = [];
    line_reader_1.default.eachLine("./input/input.txt", function (line, last) {
        geologyGrid.push(readLine(line));
        if (last) {
            var treeCount = 0;
            var slopeOneTreeCount = travelSlope(geologyGrid, 1, 1);
            var slopeTwoTreeCount = travelSlope(geologyGrid, 3, 1);
            var slopeThreeTreeCount = travelSlope(geologyGrid, 5, 1);
            var slopeFourTreeCount = travelSlope(geologyGrid, 7, 1);
            var slopeFiveTreeCount = travelSlope(geologyGrid, 1, 2);
            console.log("Result: " + (slopeOneTreeCount * slopeTwoTreeCount * slopeThreeTreeCount * slopeFourTreeCount * slopeFiveTreeCount));
        }
    });
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=puzzle02.js.map