"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readLine = void 0;
console.log("Day 04, Puzzle 01!");
var line_reader_1 = __importDefault(require("line-reader"));
function readLine(line, currentPassport) {
    if (line.length === 0) {
        return true;
    }
    var keyValuePairs = line.split(" ");
    keyValuePairs.forEach(function (pair) {
        var keyValue = pair.split(":");
        var key = keyValue[0];
        var value = keyValue[1];
        var numberValue = parseInt(keyValue[1]);
        var n = validPassportFields.length;
        for (var i = 0; i < n; i++) {
            if (validPassportFields[i] === key) {
                if (!isNaN(numberValue)) {
                    // @ts-ignore
                    currentPassport[key] = numberValue;
                }
                else {
                    // @ts-ignore
                    currentPassport[key] = value;
                }
                break;
            }
        }
    });
    return false;
}
exports.readLine = readLine;
var validPassportFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"];
function main() {
    var validPassports = 0;
    var currentPassport = {};
    var passports = [];
    line_reader_1.default.eachLine("./input/input.txt", function (line, last) {
        var onPassportComplete = function () {
            var validPassport = (typeof currentPassport.byr !== "undefined") &&
                (typeof currentPassport.iyr !== "undefined") &&
                (typeof currentPassport.eyr !== "undefined") &&
                (typeof currentPassport.hgt !== "undefined") &&
                (typeof currentPassport.hcl !== "undefined") &&
                (typeof currentPassport.ecl !== "undefined") &&
                (typeof currentPassport.pid !== "undefined");
            if (validPassport) {
                validPassports++;
            }
            passports.push(currentPassport);
            currentPassport = {};
        };
        if (readLine(line, currentPassport)) {
            onPassportComplete();
        }
        if (last) {
            onPassportComplete();
            console.log("Result: " + validPassports);
        }
    });
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=puzzle01.js.map