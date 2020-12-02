"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLine = void 0;
console.log("Day 02, Puzzle 02!");
var line_reader_1 = __importDefault(require("line-reader"));
function handleLine(line) {
    var linePattern = /^(\d+)-(\d+) (\w): (.*)$/;
    var groups = linePattern.exec(line);
    if (groups) {
        var indexOne = parseInt(groups[1]);
        var indexTwo = parseInt(groups[2]);
        var character = groups[3];
        var password = groups[4];
        if ((password.charAt(indexOne - 1) === character && password.charAt(indexTwo - 1) !== character) ||
            (password.charAt(indexOne - 1) !== character && password.charAt(indexTwo - 1) === character)) {
            console.log("Valid: " + line);
            return 1;
        }
    }
    return 0;
}
exports.handleLine = handleLine;
function main() {
    var validPasswords = 0;
    line_reader_1.default.eachLine("./input/input.txt", function (line, last) {
        validPasswords += handleLine(line);
        if (last) {
            console.log("Result: " + validPasswords);
        }
    });
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=puzzle02.js.map