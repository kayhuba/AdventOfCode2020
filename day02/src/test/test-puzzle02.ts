import assert from "assert";
import {handleLine} from "../main/puzzle02";

describe("Day02", () => {
    describe("Puzzle02", () => {
        it("Should correctly interpret the default example of AoC", () => {
            assert.equal(handleLine("1-3 a: abcde"), 1);
            assert.equal(handleLine("1-3 b: cdefg"), 0);
            assert.equal(handleLine("2-9 c: ccccccccc"), 0);
        });
    });
});
