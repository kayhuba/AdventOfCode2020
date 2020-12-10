"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 10, Puzzle 02!");
var line_reader_1 = __importDefault(require("line-reader"));
function main() {
    var adapterJoints = [0];
    line_reader_1.default.eachLine("./input/input.txt", function (line, last) {
        var current = parseInt(line);
        adapterJoints.push(current);
        if (last) {
            adapterJoints.sort(function (a, b) { return a - b; });
            adapterJoints.push(adapterJoints[adapterJoints.length - 1] + 3);
            var combinations = 0;
            var combinationStack = [0];
            var canSkipNext = function (current, nextNext) {
                return nextNext - current < 3;
            };
            var canSkipNextNext = function (current, nextNextNext) {
                return nextNextNext - current <= 3;
            };
            for (var i = adapterJoints.length - 4; i >= 0; i--) {
                if (canSkipNext(adapterJoints[i], adapterJoints[i + 2])) {
                    combinations++;
                    if (combinationStack.length > 2) {
                        combinations += combinationStack[combinationStack.length - 2];
                    }
                }
                if (i < adapterJoints.length - 3 && canSkipNextNext(adapterJoints[i], adapterJoints[i + 3])) {
                    combinations++;
                    if (combinationStack.length > 3) {
                        combinations += combinationStack[combinationStack.length - 3];
                    }
                }
                combinationStack.push(combinations);
            }
            console.log("Result: " + (combinations + 1));
        }
    });
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=puzzle02.js.map