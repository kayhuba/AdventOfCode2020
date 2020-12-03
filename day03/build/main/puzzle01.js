"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTreeAt = exports.readLine = void 0;
console.log("Day 03, Puzzle 01!");
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
function main() {
    var geologyGrid = [];
    line_reader_1.default.eachLine("./input/input.txt", function (line, last) {
        geologyGrid.push(readLine(line));
        if (last) {
            var x = 0;
            var y = 0;
            var treeCount = 0;
            while (y < geologyGrid.length) {
                if (isTreeAt(geologyGrid, x, y)) {
                    treeCount++;
                }
                x += 3;
                y += 1;
            }
            console.log("Result: " + treeCount);
        }
    });
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=puzzle01.js.map