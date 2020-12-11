"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 11, Puzzle 02!");
var line_reader_1 = __importDefault(require("line-reader"));
function main() {
    var frames = [];
    frames[0] = [];
    frames[1] = [];
    var y = 0;
    line_reader_1.default.eachLine("./input/input.txt", function (line, last) {
        frames[0][y] = [];
        frames[1][y] = [];
        for (var x = 0; x < line.length; x++) {
            frames[0][y].push(line.charAt(x));
            frames[1][y].push(line.charAt(x));
        }
        y++;
        if (last) {
            var countIfOccupied_1 = function (activeFrame, x, y) {
                if (x < 0 || x >= frames[activeFrame][0].length) {
                    return 0;
                }
                if (y < 0 || y >= frames[activeFrame].length) {
                    return 0;
                }
                return (frames[activeFrame][y][x] === "#") ? 1 : 0;
            };
            var isSeat_1 = function (activeFrame, x, y) {
                if (x < 0 || x >= frames[activeFrame][0].length) {
                    return false;
                }
                if (y < 0 || y >= frames[activeFrame].length) {
                    return false;
                }
                return frames[activeFrame][y][x] === "#" || frames[activeFrame][y][x] === "L";
            };
            var animateFrame = function (activeFrame) {
                var renderFrame = 1 - activeFrame;
                var occupied = 0;
                var changes = 0;
                for (var y_1 = 0; y_1 < frames[renderFrame].length; y_1++) {
                    for (var x = 0; x < frames[renderFrame][y_1].length; x++) {
                        var occupiedCount = 0;
                        // walk diagonal up left until found
                        for (var r = 1; x - r >= 0 && y_1 - r >= 0; r++) {
                            if (isSeat_1(activeFrame, x - r, y_1 - r)) {
                                occupiedCount += countIfOccupied_1(activeFrame, x - r, y_1 - r);
                                break;
                            }
                        }
                        // walk left until found
                        for (var r = 1; x - r >= 0; r++) {
                            if (isSeat_1(activeFrame, x - r, y_1)) {
                                occupiedCount += countIfOccupied_1(activeFrame, x - r, y_1);
                                break;
                            }
                        }
                        // walk diagonal left down until found
                        for (var r = 1; x - r >= 0 && y_1 + r < frames[activeFrame].length; r++) {
                            if (isSeat_1(activeFrame, x - r, y_1 + r)) {
                                occupiedCount += countIfOccupied_1(activeFrame, x - r, y_1 + r);
                                break;
                            }
                        }
                        // walk up until found
                        for (var r = 1; y_1 - r >= 0; r++) {
                            if (isSeat_1(activeFrame, x, y_1 - r)) {
                                occupiedCount += countIfOccupied_1(activeFrame, x, y_1 - r);
                                break;
                            }
                        }
                        // walk down until found
                        for (var r = 1; y_1 + r < frames[activeFrame].length; r++) {
                            if (isSeat_1(activeFrame, x, y_1 + r)) {
                                occupiedCount += countIfOccupied_1(activeFrame, x, y_1 + r);
                                break;
                            }
                        }
                        // walk diagonal up right until found
                        for (var r = 1; x + r < frames[activeFrame][0].length && y_1 - r >= 0; r++) {
                            if (isSeat_1(activeFrame, x + r, y_1 - r)) {
                                occupiedCount += countIfOccupied_1(activeFrame, x + r, y_1 - r);
                                break;
                            }
                        }
                        // walk right until found
                        for (var r = 1; x + r < frames[activeFrame][0].length; r++) {
                            if (isSeat_1(activeFrame, x + r, y_1)) {
                                occupiedCount += countIfOccupied_1(activeFrame, x + r, y_1);
                                break;
                            }
                        }
                        // walk diagonal right down until found
                        for (var r = 1; x + r < frames[activeFrame][0].length && y_1 + r < frames[activeFrame].length; r++) {
                            if (isSeat_1(activeFrame, x + r, y_1 + r)) {
                                occupiedCount += countIfOccupied_1(activeFrame, x + r, y_1 + r);
                                break;
                            }
                        }
                        if (frames[activeFrame][y_1][x] === "L" && occupiedCount === 0) {
                            frames[renderFrame][y_1][x] = "#";
                            changes++;
                            occupied++;
                        }
                        else if (frames[activeFrame][y_1][x] === "#" && occupiedCount > 4) {
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
//# sourceMappingURL=puzzle02.js.map