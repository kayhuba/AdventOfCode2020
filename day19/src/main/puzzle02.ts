console.log("Day 19, Puzzle 02!")

import linereader from "line-reader";

interface NumberedRule {
    [ruleNumber: number]: Rule;
}

interface Rule {
    evaluate(numberedRule: NumberedRule, refStack: ReferenceRule[]): string;
}

class MatchRule implements Rule {
    match: string;

    constructor(match: string) {
        this.match = match;
    }

    evaluate(): string {
        return this.match;
    }
}

class ReferenceRule implements Rule {
    ruleReference: number;

    constructor(ruleReference: number) {
        this.ruleReference = ruleReference;
    }

    evaluate(numberedRule: NumberedRule, refStack: ReferenceRule[]): string {
        let i;
        let loopDepth = 0;
        for (i=0; i < refStack.length; i++) {
            if (refStack[i] === this) {
                loopDepth++;
            }
        }

        // found with trial and error - with depth 4 or more the result does not change anymore (but it gets significantly slower)
        if (loopDepth === 4) {
            console.log("Loop found - breaking it up");
            return "";
        }

        refStack.push(this);
        let result = numberedRule[this.ruleReference].evaluate(numberedRule, refStack);
        refStack.pop();

        return result;
    }
}

class InvalidRule implements Rule {
    evaluate(): string {
        throw new Error("This is an invalid rule");
    }
}

class CombineRule implements Rule {
    rules: Rule[] = [];

    constructor(rules: Rule[]) {
        this.rules = rules;
    }

    evaluate(numberedRule: NumberedRule, refStack: ReferenceRule[]): string {
        let evaluated = "";
        let trackBackId = undefined;
        for (let i=0; i < this.rules.length; i++) {
            evaluated += this.rules[i].evaluate(numberedRule, refStack);
        }
        return evaluated;
    }
}

class OrRule implements Rule {
    ruleA: Rule | undefined;
    ruleB: Rule | undefined;

    evaluate(numberedRule: NumberedRule, refStack: ReferenceRule[]): string {
        if (this.ruleA === undefined || this.ruleB === undefined) {
            throw new Error("OrRule is not complete");
        }

        let resultA = this.ruleA.evaluate(numberedRule, refStack);
        let resultB = this.ruleB.evaluate(numberedRule, refStack);

        if (resultA.indexOf("|") != -1) {
            resultA = "(" + resultA + ")";
        }

        if (resultB.indexOf("|") != -1) {
            resultB = "(" + resultB + ")";
        }

        return "(" + resultA + "|" + resultB + ")";
    }
}

enum Token {
    STRING="^\\s*\\\"(.*)\\\"\\s*",
    REFERENCE="^\\s*(\\d+)\\s*",
    OR="^\\s*\\|\\s*",
    UNKNOWN=".*"
}

function hasMoreToken(input: string): boolean {
    return input.match(Token.STRING) !== null || input.match(Token.REFERENCE) !== null || input.match(Token.OR) !== null;
}

function peekNextToken(input: string): Token {
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

function consumeNextToken(input: string): {rule: Rule, remaining: string} {
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
    const numberedLine: NumberedRule = {};
    const matchLines: string[] = [];

    linereader.eachLine("./input/input2.txt", (line, last) => {
        const consumeReferenceToken = (): Rule => {
            const referenceRules: ReferenceRule[] = [];
            while (hasMoreToken(line) && peekNextToken(line) === Token.REFERENCE) {
                let result = consumeNextToken(line);
                line = result.remaining;
                referenceRules.push(result.rule as ReferenceRule);
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

            const ruleStack: Rule[] = [];
            if (peekNextToken(line) === Token.STRING) {
                ruleStack.push(consumeNextToken(line).rule);
            } else if (peekNextToken(line) === Token.REFERENCE) {
                ruleStack.push(consumeReferenceToken());

                if (hasMoreToken(line)) {
                    let result = consumeNextToken(line);
                    line = result.remaining;

                    // according to rules this has to be an or rule
                    let orRule: OrRule = result.rule as OrRule;

                    orRule.ruleA = ruleStack.pop();
                    orRule.ruleB = consumeReferenceToken();
                    ruleStack.push(orRule);
                }
            }

            numberedLine[ruleNumber] = ruleStack[0];
        } else {
            if (line.length > 0) {
                matchLines.push(line);
            }
        }

        if (last) {
            let matchCount = 0;
            let pattern = "^(" + numberedLine[0].evaluate(numberedLine, []) + ")$";
            console.log("Evaluated pattern: " + pattern);

            for (let i=0; i < matchLines.length; i++) {
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

