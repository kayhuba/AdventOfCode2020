console.log("Day 17, Puzzle 01!")

import linereader from "line-reader";

interface Expression {
    evaluate: () => number;
}

class NumberExpression implements Expression {
    number: number;

    constructor(number: number) {
        this.number = number;
    }

    evaluate(): number {
        return this.number;
    }
}

class Operation implements Expression {
    left: Expression | undefined;
    right: Expression | undefined;
    operator: "*" | "+" | undefined;

    evaluate(): number {
        if (this.left === undefined) {
            throw new Error("Left operand was undefined at time of evaluation");
        }

        if (this.right === undefined) {
            throw new Error("Right operand was undefined at time of evaluation");
        }

        if (this.operator === "*") {
            return this.left.evaluate() * this.right.evaluate();
        } else if (this.operator === "+") {
            return this.left.evaluate() + this.right.evaluate();
        } else {
            throw new Error("Invalid operator");
        }
    }
}

class ParenthesisExpression implements Expression {
    containedExpression: Expression | undefined;

    evaluate(): number {
        if (this.containedExpression === undefined) {
            throw new Error("Invalid parenthesis expression (no content)")
        }

        return this.containedExpression.evaluate();
    }
}

enum Token {
    Whitespace = "^\\s+",
    Number = "^\\d+",
    ParenthesisOpen = "^\\(",
    ParenthesisClose = "^\\)",
    OperatorAdd = "^\\+",
    OperatorMultiply = "^\\*"
}

function main() {
    let sumOfAllLineResults = 0;
    linereader.eachLine("./input/input.txt", (line, last) => {
        const clauses: Expression[] = [];
        while (line.length > 0) {
            if (line.match(Token.Whitespace)) {
                // @ts-ignore
                let match = line.match(Token.Whitespace)[0];
                line = line.substring(match.length);
            } else if (line.match(Token.Number)) {
                // @ts-ignore
                let match = line.match(Token.Number)[0];

                let number = new NumberExpression(parseInt(match));
                let lastExpression = clauses[clauses.length - 1];
                if (lastExpression !== undefined && lastExpression instanceof Operation) {
                    lastExpression.right = number;
                } else {
                    clauses.push(number);
                }

                line = line.substring(match.length);
            } else if (line.match(Token.OperatorAdd)) {
                // @ts-ignore
                let match = line.match(Token.OperatorAdd)[0];

                let operation: Operation = new Operation();
                operation.left = clauses.pop();
                operation.operator = "+";
                clauses.push(operation);

                line = line.substring(match.length);
            } else if (line.match(Token.OperatorMultiply)) {
                // @ts-ignore
                let match = line.match(Token.OperatorMultiply)[0];

                let operation: Operation = new Operation();
                operation.left = clauses.pop();
                operation.operator = "*";
                clauses.push(operation);

                line = line.substring(match.length);
            } else if (line.match(Token.ParenthesisOpen)) {
                // @ts-ignore
                let match = line.match(Token.ParenthesisOpen)[0];

                clauses.push(new ParenthesisExpression());

                line = line.substring(match.length);
            } else if (line.match(Token.ParenthesisClose)) {
                // @ts-ignore
                let match = line.match(Token.ParenthesisClose)[0];

                let containedExpression = clauses.pop();
                let parenthesisExpression: ParenthesisExpression = clauses.pop() as ParenthesisExpression;
                parenthesisExpression.containedExpression = containedExpression;

                let lastExpression = clauses[clauses.length - 1];
                if (lastExpression !== undefined && lastExpression instanceof Operation) {
                    lastExpression.right = parenthesisExpression;
                } else {
                    clauses.push(parenthesisExpression);
                }

                line = line.substring(match.length);
            }
        }
        console.log("Line result: " + clauses[0].evaluate());
        sumOfAllLineResults += clauses[0].evaluate();

        if (last) {
            console.log("Result: " + sumOfAllLineResults);
        }
    });
}

if (require.main === module) {
    main();
}

