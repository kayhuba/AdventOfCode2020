"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var victor_1 = __importDefault(require("victor"));
console.log("Day 12, Puzzle 01!");
var line_reader_1 = __importDefault(require("line-reader"));
function main() {
    var direction = new victor_1.default(1, 0);
    var position = new victor_1.default(0, 0);
    line_reader_1.default.eachLine("./input/input.txt", function (line, last) {
        var amount = parseInt(line.substring(1));
        switch (line.charAt(0)) {
            case "N": {
                position.add(new victor_1.default(0, amount));
                break;
            }
            case "S": {
                position.add(new victor_1.default(0, -amount));
                break;
            }
            case "E": {
                position.add(new victor_1.default(amount, 0));
                break;
            }
            case "W": {
                position.add(new victor_1.default(-amount, 0));
                break;
            }
            case "L": {
                direction.rotateDeg(amount);
                break;
            }
            case "R": {
                direction.rotateDeg(-amount);
                break;
            }
            case "F": {
                var move = direction.clone().multiplyScalar(amount);
                position.add(move);
                break;
            }
        }
        if (last) {
            console.log("Result: " + Math.floor(position.x - position.y));
        }
    });
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=puzzle01.js.map