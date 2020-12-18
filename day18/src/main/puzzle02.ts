console.log("Day 18, Puzzle 02!")

import linereader from "line-reader";

interface Expression {
    evaluate(): number;
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
        let clauses: Expression[] = [];
        while (line.length > 0) {
            if (line.match(Token.Whitespace)) {
                // @ts-ignore
                let match = line.match(Token.Whitespace)[0];
                line = line.substring(match.length);
            } else if (line.match(Token.Number)) {
                // @ts-ignore
                let match = line.match(Token.Number)[0];

                let number = new NumberExpression(parseInt(match));

                if (clauses.length > 0 && (clauses[clauses.length - 1] instanceof Operation)) {
                    let operation: Operation = clauses[clauses.length - 1] as Operation;
                    while (operation.right !== undefined) {
                        operation = operation.right as Operation;
                    }
                    operation.right = number;
                } else {
                    clauses.push(number);
                }

                line = line.substring(match.length);
            } else if (line.match(Token.OperatorAdd)) {
                // @ts-ignore
                let match = line.match(Token.OperatorAdd)[0];

                let operation: Operation = new Operation();
                operation.operator = "+";

                let lastExpression = clauses.pop();
                if (lastExpression instanceof Operation) {
                    let lastOperation: Operation = lastExpression;
                    operation.left = lastOperation.right;
                    lastOperation.right = operation;
                    clauses.push(lastOperation);
                } else {
                    operation.left = lastExpression;
                    clauses.push(operation);
                }

                line = line.substring(match.length);
            } else if (line.match(Token.OperatorMultiply)) {
                // @ts-ignore
                let match = line.match(Token.OperatorMultiply)[0];

                let operation: Operation = new Operation();
                operation.operator = "*";

                let lastExpression = clauses.pop();
                operation.left = lastExpression;
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
                    let operation: Operation = clauses[clauses.length - 1] as Operation;
                    while (operation.right !== undefined) {
                        operation = operation.right as Operation;
                    }
                    operation.right = parenthesisExpression;
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

