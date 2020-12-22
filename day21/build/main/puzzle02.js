"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 21, Puzzle 02!");
const line_reader_1 = __importDefault(require("line-reader"));
function main() {
    line_reader_1.default.eachLine("./input/input.txt", (line, last) => {
        if (last) {
            console.log("Result: ");
        }
    });
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=puzzle02.js.map