"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 19, Puzzle 01!");
const line_reader_1 = __importDefault(require("line-reader"));
class MatchRule {
    constructor(match) {
        this.match = match;
    }
    evaluate() {
        return this.match;
    }
}
class ReferenceRule {
    constructor(lineReference, lines) {
        this.lineReference = lineReference;
        this.lines = lines;
    }
    evaluate() {
        return this.lines[this.lineReference].evaluate();
    }
}
class CombineRule {
    constructor(ruleA, ruleB) {
        this.ruleA = ruleA;
        this.ruleB = ruleB;
    }
    evaluate() {
        return this.ruleA.evaluate() + this.ruleB.evaluate();
    }
}
class OrRule {
    constructor(ruleA, ruleB) {
        this.ruleA = ruleA;
        this.ruleB = ruleB;
    }
    evaluate() {
        return "(" + this.ruleA.evaluate() + ")|(" + this.ruleB.evaluate() + ")";
    }
}
class NumberedRule {
    constructor(ruleNumber) {
        this.ruleNumber = ruleNumber;
    }
    evaluate() {
        if (this.rule === undefined) {
            throw new Error("Rule not defined yet!");
        }
        return this.rule.evaluate();
    }
}
var Token;
(function (Token) {
    Token["MATCH"] = "^\\s*\\\"(.*)\\\"";
    Token["REFERENCE"] = "^\\s*(\\d+)";
    Token["OR"] = "^\\s*\\|";
    Token["WHITESPACE"] = "\\s*";
})(Token || (Token = {}));
function main() {
    let lineCount = 0;
    const numberedRules = [];
    const matchLines = [];
    /*
    const safeMatch = (str: string, pattern: string): RegExpMatchArray => {
        const match = str.match(pattern);
        if (match === null) {
            throw new Error("")
        }
    };
     */
    line_reader_1.default.eachLine("./input/input.txt", (line, last) => {
        if (line.match("^\d+:")) {
            let token = line.match("^(\d+):");
            if (token === null) {
                throw new Error("No match");
            }
            const ruleNumber = parseInt(token[1]);
            let numberedRule = new NumberedRule(ruleNumber);
            line = line.substring(token[1].length);
            const ruleStack = [];
            while (line.length > 0) {
                token = line.match(Token.MATCH);
                if (token !== null) {
                    ruleStack.push(new MatchRule(token[1]));
                    line = line.substring(token.length);
                }
            }
            numberedRule.rule = ruleStack[0];
        }
        if (last) {
            console.log("Result: ");
        }
    });
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=puzzle01.js.map