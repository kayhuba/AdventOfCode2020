"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 10, Puzzle 01!");
var line_reader_1 = __importDefault(require("line-reader"));
function main() {
    var adapterJoints = [];
    line_reader_1.default.eachLine("./input/input.txt", function (line, last) {
        var current = parseInt(line);
        adapterJoints.push(current);
        if (last) {
            adapterJoints.sort(function (a, b) { return a - b; });
            var isOneDiff = function (value1, value2) {
                return (value2 - value1) === 1;
            };
            var isThreeDiff = function (value1, value2) {
                return (value2 - value1) === 3;
            };
            var numberOfOneDiff = 0;
            var numberOfThreeDiff = 1; // the last one is always a three-diff from adapter to the device as per spec
            var prev = 0;
            for (var i = 0; i < adapterJoints.length; i++) {
                if (isOneDiff(prev, adapterJoints[i])) {
                    numberOfOneDiff++;
                }
                else if (isThreeDiff(prev, adapterJoints[i])) {
                    numberOfThreeDiff++;
                }
                prev = adapterJoints[i];
            }
            console.log("Result: " + numberOfOneDiff + " " + numberOfThreeDiff + " " + (numberOfOneDiff * numberOfThreeDiff));
        }
    });
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=puzzle01.js.map