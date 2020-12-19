console.log("Day 19, Puzzle 01!")

import linereader from "line-reader";

interface Rule {
    evaluate(): string;
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
    lineReference: number;
    lines: Rule[];

    constructor(lineReference: number, lines: Rule[]) {
        this.lineReference = lineReference;
        this.lines = lines;
    }

    evaluate(): string {
        return this.lines[this.lineReference].evaluate();
    }
}

class CombineRule implements Rule {
    ruleA: Rule;
    ruleB: Rule;

    constructor(ruleA: Rule, ruleB: Rule) {
        this.ruleA = ruleA;
        this.ruleB = ruleB;
    }

    evaluate(): string {
        return this.ruleA.evaluate() + this.ruleB.evaluate();
    }
}

class OrRule implements Rule {
    ruleA: Rule;
    ruleB: Rule;

    constructor(ruleA: Rule, ruleB: Rule) {
        this.ruleA = ruleA;
        this.ruleB = ruleB;
    }

    evaluate(): string {
        return "(" + this.ruleA.evaluate() + ")|(" + this.ruleB.evaluate() + ")";
    }
}

class NumberedRule {
    ruleNumber: number;
    rule: Rule | undefined;

    constructor(ruleNumber: number) {
        this.ruleNumber = ruleNumber;
    }

    evaluate(): string {
        if (this.rule === undefined) {
            throw new Error("Rule not defined yet!");
        }

        return this.rule.evaluate();
    }
}

enum Token {
    MATCH="^\\s*\\\"(.*)\\\"",
    REFERENCE="^\\s*(\\d+)",
    OR="^\\s*\\|",
    WHITESPACE="\\s*"
}

function main() {
    let lineCount = 0;
    const numberedRules: NumberedRule[] = [];
    const matchLines: string[] = [];

    /*
    const safeMatch = (str: string, pattern: string): RegExpMatchArray => {
        const match = str.match(pattern);
        if (match === null) {
            throw new Error("")
        }
    };
     */

    linereader.eachLine("./input/input.txt", (line, last) => {
        if (line.match("^\d+:")) {
            let token = line.match("^(\d+):");
            if (token === null) {
                throw new Error("No match");
            }

            const ruleNumber = parseInt(token[1]);
            let numberedRule: NumberedRule = new NumberedRule(ruleNumber);

            line = line.substring(token[1].length);

            const ruleStack: Rule[] = [];
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

