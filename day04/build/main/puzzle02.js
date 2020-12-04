"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readLine = void 0;
console.log("Day 04, Puzzle 02!");
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
        var n = validPassportFields.length;
        for (var i = 0; i < n; i++) {
            if (validPassportFields[i] === key) {
                // @ts-ignore
                currentPassport[key] = value;
                break;
            }
        }
    });
    return false;
}
exports.readLine = readLine;
var validPassportFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"];
var passportFieldValidators = {
    "byr": {
        // byr (Birth Year) - four digits; at least 1920 and at most 2002.
        pattern: /^\d{4}$/,
        validator: function (value) { return (parseInt(value) >= 1920 && parseInt(value) <= 2002); }
    },
    "iyr": {
        // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
        pattern: /^\d{4}$/,
        validator: function (value) { return (parseInt(value) >= 2010 && parseInt(value) <= 2020); }
    },
    "eyr": {
        // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
        pattern: /^\d{4}$/,
        validator: function (value) { return (parseInt(value) >= 2020 && parseInt(value) <= 2030); }
    },
    "hgt": {
        // hgt (Height) - a number followed by either cm or in:
        //   If cm, the number must be at least 150 and at most 193.
        //   If in, the number must be at least 59 and at most 76.
        pattern: /^\d+(cm)|(in)$/,
        validator: function (value) {
            var height = parseInt(value);
            if (/^\d+cm$/.test(value)) {
                return height >= 150 && height <= 193;
            }
            if (/^\d+in$/.test(value)) {
                return height >= 59 && height <= 76;
            }
            return false;
        }
    },
    "hcl": {
        // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
        pattern: /^#[0-9a-f]{6}$/
    },
    "ecl": {
        // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
        pattern: /^(amb)|(blu)|(brn)|(gry)|(grn)|(hzl)|(oth)$/
    },
    "pid": {
        // pid (Passport ID) - a nine-digit number, including leading zeroes.
        pattern: /^\d{9}$/
    },
    "cid": {
        // cid (Country ID) - ignored, missing or not.
        pattern: /^.*$/
    }
};
function validate(validator, passportField) {
    if (typeof validator.pattern !== "undefined") {
        if (!validator.pattern.test(passportField)) {
            return false;
        }
    }
    if (typeof validator.validator !== "undefined") {
        return validator.validator(passportField);
    }
    return true;
}
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
                for (var key in currentPassport) {
                    // @ts-ignore
                    validPassport = validPassport && validate(passportFieldValidators[key], currentPassport[key]);
                }
            }
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
//# sourceMappingURL=puzzle02.js.map