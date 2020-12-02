import assert from "assert";
import {handleLine} from "../main/puzzle01";

describe("Day02", () => {
    describe("Puzzle01", () => {
        it("Should correctly interpret the default example of AoC", () => {
            assert.equal(handleLine("1-3 a: abcde"), 1);
            assert.equal(handleLine("1-3 b: cdefg"), 0);
            assert.equal(handleLine("2-9 c: ccccccccc"), 1);
        });

        it("Should be valid '0-1 a: ...'", () => {
            assert.equal(handleLine("0-1 a: a"), 1);
            assert.equal(handleLine("0-1 a: bbbb"), 1);
            assert.equal(handleLine("0-1 a: abbbb"), 1);
            assert.equal(handleLine("0-1 a: bbbba"), 1);
            assert.equal(handleLine("0-1 a: bbbbabbbb"), 1);
        });

        it("Should be valid '1-1 a: ...'", () => {
            assert.equal(handleLine("1-1 a: a"), 1);
            assert.equal(handleLine("1-1 a: abbbb"), 1);
            assert.equal(handleLine("1-1 a: bbbba"), 1);
            assert.equal(handleLine("1-1 a: bbbbabbbb"), 1);
        });

        it("Should be invalid '1-1 a: ...'", () => {
            assert.equal(handleLine("1-1 a: b"), 0);
            assert.equal(handleLine("1-1 a: aa"), 0);
            assert.equal(handleLine("1-1 a: aabbbbbbbb"), 0);
            assert.equal(handleLine("1-1 a: bbbbaabbbb"), 0);
            assert.equal(handleLine("1-1 a: bbbbbbbbaa"), 0);
        });

        it("Should be valid '2-3 a: ...'", () => {
            assert.equal(handleLine("2-3 a: aa"), 1);
            assert.equal(handleLine("2-3 a: aaa"), 1);
            assert.equal(handleLine("2-3 a: aabbbb"), 1);
            assert.equal(handleLine("2-3 a: bbbbaabbbb"), 1);
        });

        it("Should be invalid '2-3 a: ...'", () => {
            assert.equal(handleLine("2-3 a: a"), 0);
            assert.equal(handleLine("2-3 a: aaaa"), 0);
            assert.equal(handleLine("2-3 a: b"), 0);
            assert.equal(handleLine("2-3 a: bbbb"), 0);
            assert.equal(handleLine("2-3 a: abbbb"), 0);
            assert.equal(handleLine("2-3 a: bbbbabbbb"), 0);
        });

        it("Should be valid '10-10 a: ...'", () => {
            assert.equal(handleLine("10-10 a: aaaaaaaaaa"), 1);
            assert.equal(handleLine("10-10 a: aaaaaaaaaabbbb"), 1);
            assert.equal(handleLine("10-10 a: bbbbaaaaaaaaaa"), 1);
            assert.equal(handleLine("10-10 a: bbbbaaaaaaaaaabbbb"), 1);
            assert.equal(handleLine("10-10 a: babababababababababa"), 1);
        });

        it("Should be invalid '10-10 a: ...'", () => {
            assert.equal(handleLine("10-10 a: b"), 0);
            assert.equal(handleLine("10-10 a: aa"), 0);
            assert.equal(handleLine("10-10 a: aaaaaaaaaaabbbbbbbb"), 0);
            assert.equal(handleLine("10-10 a: bbbbaaaaaaaaaaabbbb"), 0);
            assert.equal(handleLine("10-10 a: bbbbbbbbaaaaaaaaaaa"), 0);
        });

        it("Should be valid '5-15 a: ...'", () => {
            assert.equal(handleLine("5-15 a: aaaaa"), 1);
            assert.equal(handleLine("5-15 a: aaaaaaaaaa"), 1);
            assert.equal(handleLine("5-15 a: aaaaaaaaaaaaaaa"), 1);
            assert.equal(handleLine("5-15 a: aaaaaaaaaabbbb"), 1);
            assert.equal(handleLine("5-15 a: bbbbaaaaaaaaaa"), 1);
            assert.equal(handleLine("5-15 a: bbbbaaaaaaaaaabbbb"), 1);
            assert.equal(handleLine("5-15 a: babababababababababa"), 1);
        });

        it("Should be invalid '5-15 a: ...'", () => {
            assert.equal(handleLine("5-15 a: aaaa"), 0);
            assert.equal(handleLine("5-15 a: aaaaaaaaaaaaaaaa"), 0);
        });
    });
});
