"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 01, Puzzle 02!");
var line_reader_1 = __importDefault(require("line-reader"));
/**
 * Basic idea:
 *
 * a + b + c = 2020
 *
 * if a < 2020 * 1/3 then b or c have to be bigger than 2020 * 1/3
 * if a >= 2020 * 2/3 then b or c have to be smaller than 2020 * 2/3
 * if a is between 1/3 and 2/3 then we skip it because it will be "b or c" in one of the other two cases
 *
 * Once a and b are defined, choose c like this:
 *
 * if a + b < 1010 then c has to be bigger than 1010
 * if a + b >= 1010 then c has to be smaller than 1010
 */
var numberArray = [];
// indices of numbers in numberArray that are from 0 to 1/3 of 2020
var firstThirdIndexArray = [];
// indices of numbers in numberArray that are from 1/3 to 2/3 of 2020
var secondThirdIndexArray = [];
// indices of numbers in numberArray that are from from 2/3 to 3/3 of 2020
var thirdThirdIndexArray = [];
// indices of numbers in numberArray that are from from 0 to 1/2 of 2020
var firstHalfIndexArray = [];
// indices of numbers in numberArray that are from from 1/2 to 2020
var secondHalfIndexArray = [];
var counter = 0;
line_reader_1.default.eachLine("./input/input.txt", function (line, last) {
    var current = parseInt(line);
    numberArray.push(current);
    if (current < (2020 / 3)) {
        firstThirdIndexArray.push(counter);
    }
    else if (current < (4040 / 3)) {
        secondThirdIndexArray.push(counter);
    }
    else {
        thirdThirdIndexArray.push(counter);
    }
    if (current < 1010) {
        firstHalfIndexArray.push(counter);
    }
    else {
        secondHalfIndexArray.push(counter);
    }
    counter++;
    var findThirdOperand = function (first, second) {
        var firstSecondSum = first + second;
        var third;
        var findMatchInArray = function (indexArray) {
            var n = indexArray.length;
            for (var i = 0; i < n; i++) {
                third = numberArray[indexArray[i]];
                if (third === first || third === second) {
                    continue;
                }
                if (firstSecondSum + third === 2020) {
                    console.log("Riddle solution: " + (first * second * third));
                    return true;
                }
            }
            return false;
        };
        if (firstSecondSum < 1010) {
            return findMatchInArray(secondHalfIndexArray);
        }
        else {
            return findMatchInArray(firstHalfIndexArray);
        }
        return false;
    };
    var findSecondAndThirdOperand = function (first, indexArrays) {
        var second;
        var n = indexArrays.length;
        for (var i = 0; i < n; i++) {
            var m = indexArrays[i].length;
            for (var j = 0; j < m; j++) {
                second = numberArray[indexArrays[i][j]];
                if (findThirdOperand(first, second)) {
                    return true;
                }
            }
        }
        return false;
    };
    if (last) {
        var n = numberArray.length;
        for (var i = 0; i < n; i++) {
            var first = numberArray[i];
            if (first < 2020 / 3) {
                if (findSecondAndThirdOperand(first, [secondThirdIndexArray, thirdThirdIndexArray])) {
                    return;
                }
            }
            else if (first >= 4040 / 3) {
                if (findSecondAndThirdOperand(first, [secondThirdIndexArray, firstThirdIndexArray])) {
                    return;
                }
            }
        }
        console.error("Our algo doesn't work :-(");
    }
});
//# sourceMappingURL=puzzle02.js.map