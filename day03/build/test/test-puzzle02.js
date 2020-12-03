"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var puzzle02_1 = require("../main/puzzle02");
describe("Day02", function () {
    describe("Puzzle02", function () {
        it("Should correctly interpret the default example of AoC", function () {
            assert_1.default.equal(puzzle02_1.handleLine("1-3 a: abcde"), 1);
            assert_1.default.equal(puzzle02_1.handleLine("1-3 b: cdefg"), 0);
            assert_1.default.equal(puzzle02_1.handleLine("2-9 c: ccccccccc"), 0);
        });
    });
});
//# sourceMappingURL=test-puzzle02.js.map