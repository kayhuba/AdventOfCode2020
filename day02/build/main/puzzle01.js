"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLine = void 0;
console.log("Day 02, Puzzle 01!");
var line_reader_1 = __importDefault(require("line-reader"));
function handleLine(line) {
    var linePattern = /^(\d+)-(\d+) (\w): (.*)$/;
    var groups = linePattern.exec(line);
    if (groups) {
        var min = parseInt(groups[1]);
        var max = parseInt(groups[2]);
        var character = groups[3];
        var password = groups[4];
        var passwordMatches = password.match(new RegExp(character, "g")) || [];
        if (passwordMatches.length >= min && passwordMatches.length <= max) {
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
//# sourceMappingURL=puzzle01.js.map