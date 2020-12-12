"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var victor_1 = __importDefault(require("victor"));
console.log("Day 12, Puzzle 02!");
var line_reader_1 = __importDefault(require("line-reader"));
function main() {
    var waypoint = new victor_1.default(10, 1);
    var position = new victor_1.default(0, 0);
    line_reader_1.default.eachLine("./input/input.txt", function (line, last) {
        var amount = parseInt(line.substring(1));
        switch (line.charAt(0)) {
            case "N": {
                waypoint.add(new victor_1.default(0, amount));
                break;
            }
            case "S": {
                waypoint.add(new victor_1.default(0, -amount));
                break;
            }
            case "E": {
                waypoint.add(new victor_1.default(amount, 0));
                break;
            }
            case "W": {
                waypoint.add(new victor_1.default(-amount, 0));
                break;
            }
            case "L": {
                waypoint.rotateDeg(amount);
                break;
            }
            case "R": {
                waypoint.rotateDeg(-amount);
                break;
            }
            case "F": {
                var move = waypoint.clone().multiplyScalar(amount);
                position.add(move);
                break;
            }
        }
        if (last) {
            console.log("Result: " + Math.round(position.x - position.y));
        }
    });
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=puzzle02.js.map