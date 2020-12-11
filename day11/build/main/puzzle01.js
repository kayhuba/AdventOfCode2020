"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 11, Puzzle 01!");
var line_reader_1 = __importDefault(require("line-reader"));
function main() {
    var frames = [];
    frames[0] = [];
    frames[1] = [];
    var y = 0;
    line_reader_1.default.eachLine("./input/input.txt", function (line, last) {
        var addEmptyLine = function () {
            frames[0][y].push(".");
            frames[1][y].push(".");
            for (var x = 0; x < line.length; x++) {
                frames[0][y].push(".");
                frames[1][y].push(".");
            }
            frames[0][y].push(".");
            frames[1][y].push(".");
        };
        if (y === 0) {
            frames[0][y] = [];
            frames[1][y] = [];
            addEmptyLine();
            y++;
        }
        frames[0][y] = [];
        frames[1][y] = [];
        frames[0][y].push(".");
        frames[1][y].push(".");
        for (var x = 0; x < line.length; x++) {
            frames[0][y].push(line.charAt(x));
            frames[1][y].push(line.charAt(x));
        }
        frames[0][y].push(".");
        frames[1][y].push(".");
        y++;
        if (last) {
            frames[0][y] = [];
            frames[1][y] = [];
            addEmptyLine();
            y++;
            var animateFrame = function (activeFrame) {
                var renderFrame = 1 - activeFrame;
                var occupied = 0;
                var changes = 0;
                for (var y_1 = 1; y_1 < frames[renderFrame].length - 1; y_1++) {
                    for (var x = 1; x < frames[renderFrame][y_1].length - 1; x++) {
                        var occupiedCount = 0;
                        occupiedCount += (frames[activeFrame][y_1 - 1][x - 1] === "#" ? 1 : 0);
                        occupiedCount += (frames[activeFrame][y_1 - 1][x] === "#" ? 1 : 0);
                        occupiedCount += (frames[activeFrame][y_1 - 1][x + 1] === "#" ? 1 : 0);
                        occupiedCount += (frames[activeFrame][y_1][x - 1] === "#" ? 1 : 0);
                        occupiedCount += (frames[activeFrame][y_1][x + 1] === "#" ? 1 : 0);
                        occupiedCount += (frames[activeFrame][y_1 + 1][x - 1] === "#" ? 1 : 0);
                        occupiedCount += (frames[activeFrame][y_1 + 1][x] === "#" ? 1 : 0);
                        occupiedCount += (frames[activeFrame][y_1 + 1][x + 1] === "#" ? 1 : 0);
                        if (frames[activeFrame][y_1][x] === "L" && occupiedCount === 0) {
                            frames[renderFrame][y_1][x] = "#";
                            changes++;
                            occupied++;
                        }
                        else if (frames[activeFrame][y_1][x] === "#" && occupiedCount > 3) {
                            frames[renderFrame][y_1][x] = "L";
                            changes++;
                        }
                        else {
                            frames[renderFrame][y_1][x] = frames[activeFrame][y_1][x];
                            if (frames[renderFrame][y_1][x] === "#") {
                                occupied++;
                            }
                        }
                    }
                }
                return { occupiedCount: occupied, changes: changes };
            };
            var result = void 0;
            var activeFrame = 1;
            animateFrame(0);
            do {
                result = animateFrame(activeFrame);
                activeFrame = 1 - activeFrame;
            } while (result.changes > 0);
            console.log("Result: " + result.occupiedCount);
        }
    });
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=puzzle01.js.map