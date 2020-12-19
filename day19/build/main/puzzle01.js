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
    constructor(ruleReference) {
        this.ruleReference = ruleReference;
    }
    evaluate(numberedRule) {
        return numberedRule[this.ruleReference].evaluate(numberedRule);
    }
}
class InvalidRule {
    evaluate() {
        throw new Error("This is an invalid rule");
    }
}
class CombineRule {
    constructor(rules) {
        this.rules = [];
        this.rules = rules;
    }
    evaluate(numberedRule) {
        let evaluated = "";
        for (let i = 0; i < this.rules.length; i++) {
            evaluated += this.rules[i].evaluate(numberedRule);
        }
        return evaluated;
    }
}
class OrRule {
    evaluate(numberedRule) {
        if (this.ruleA === undefined || this.ruleB === undefined) {
            throw new Error("OrRule is not complete");
        }
        return "((" + this.ruleA.evaluate(numberedRule) + ")|(" + this.ruleB.evaluate(numberedRule) + "))";
    }
}
var Token;
(function (Token) {
    Token["STRING"] = "^\\s*\\\"(.*)\\\"\\s*";
    Token["REFERENCE"] = "^\\s*(\\d+)\\s*";
    Token["OR"] = "^\\s*\\|\\s*";
    Token["UNKNOWN"] = ".*";
})(Token || (Token = {}));
function hasMoreToken(input) {
    return input.match(Token.STRING) !== null || input.match(Token.REFERENCE) !== null || input.match(Token.OR) !== null;
}
function peekNextToken(input) {
    if (input.match(Token.STRING) !== null) {
        return Token.STRING;
    }
    if (input.match(Token.REFERENCE) !== null) {
        return Token.REFERENCE;
    }
    if (input.match(Token.OR) !== null) {
        return Token.OR;
    }
    return Token.UNKNOWN;
}
function consumeNextToken(input) {
    let token = input.match(Token.STRING);
    if (token !== null) {
        return {
            remaining: input.substring(token[0].length),
            rule: new MatchRule(token[1])
        };
    }
    token = input.match(Token.REFERENCE);
    if (token !== null) {
        return {
            remaining: input.substring(token[0].length),
            rule: new ReferenceRule(parseInt(token[1]))
        };
    }
    token = input.match(Token.OR);
    if (token !== null) {
        return {
            remaining: input.substring(token[0].length),
            rule: new OrRule()
        };
    }
    return {
        remaining: input,
        rule: new InvalidRule()
    };
}
function main() {
    const numberedLine = {};
    const matchLines = [];
    line_reader_1.default.eachLine("./input/input1.txt", (line, last) => {
        const consumeReferenceToken = () => {
            const referenceRules = [];
            while (hasMoreToken(line) && peekNextToken(line) === Token.REFERENCE) {
                let result = consumeNextToken(line);
                line = result.remaining;
                referenceRules.push(result.rule);
            }
            if (referenceRules.length === 1) {
                return referenceRules[0];
            }
            return new CombineRule(referenceRules);
        };
        if (line.match("^\\d+:")) {
            let token = line.match("^(\\d+):");
            if (token === null) {
                throw new Error("No match");
            }
            const ruleNumber = parseInt(token[1]);
            line = line.substring(token[0].length);
            const ruleStack = [];
            if (peekNextToken(line) === Token.STRING) {
                ruleStack.push(consumeNextToken(line).rule);
            }
            else if (peekNextToken(line) === Token.REFERENCE) {
                ruleStack.push(consumeReferenceToken());
                if (hasMoreToken(line)) {
                    let result = consumeNextToken(line);
                    line = result.remaining;
                    // according to rules this has to be an or rule
                    let orRule = result.rule;
                    orRule.ruleA = ruleStack.pop();
                    orRule.ruleB = consumeReferenceToken();
                    ruleStack.push(orRule);
                }
            }
            numberedLine[ruleNumber] = ruleStack[0];
        }
        else {
            if (line.length > 0) {
                matchLines.push(line);
            }
        }
        if (last) {
            let matchCount = 0;
            let pattern = "^(" + numberedLine[0].evaluate(numberedLine) + ")$";
            console.log("Evaluated pattern: " + pattern);
            for (let i = 0; i < matchLines.length; i++) {
                if (matchLines[i].match(pattern) !== null) {
                    matchCount++;
                }
            }
            console.log("Result: " + matchCount);
        }
    });
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=puzzle01.js.map