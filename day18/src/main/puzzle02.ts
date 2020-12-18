console.log("Day 17, Puzzle 02!")

import linereader from "line-reader";

interface Expression {
    evaluate(): number;
    clone(): this;
}

class NumberExpression implements Expression {
    number: number;

    constructor(number: number) {
        this.number = number;
    }

    evaluate(): number {
        return this.number;
    }

    clone(): this {
        return new NumberExpression(this.number) as this;
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

    clone(): this {
        const clone = new Operation();
        clone.left = this.left;
        clone.right = this.right;
        clone.operator = this.operator;
        return clone as this;
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

    clone(): this {
        const clone = new ParenthesisExpression();
        clone.containedExpression = this.containedExpression;
        return clone as this;
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

    const reduceClause = (clause1: Expression, clause2: Expression): Expression => {
        if (clause1 instanceof Operation && clause2 instanceof Operation) {
            let operation1: Operation = clause1 as Operation;
            let operation2: Operation = clause2 as Operation;

            if (operation1.operator === operation2.operator || operation1.operator === "+") {
                operation1.right = operation2.left;
                operation2.left = operation1;
                return operation2;
            } else {
                operation1.right = operation2;
                return operation1;
            }
        } else if (clause2 instanceof Operation) {
            (clause2 as Operation).left = clause1;
            return clause2;
        } else if (clause1 instanceof Operation) {
            (clause1 as Operation).right = clause2;
            return clause1;
        }

        return clause2;
    };

    const reduce = (clauses: Expression[]): Expression[] => {
        let newClauses: Expression[] = [];

        while (clauses.length > 1) {
            newClauses = [];
            for (let i=0; i < clauses.length - 1; i+=2) {
                newClauses.push(reduceClause(clauses[i].clone(), clauses[i + 1].clone()));
            }
            clauses = newClauses;
        }

        return newClauses;
    };

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
                clauses.push(number);

                line = line.substring(match.length);
            } else if (line.match(Token.OperatorAdd)) {
                // @ts-ignore
                let match = line.match(Token.OperatorAdd)[0];

                let operation: Operation = new Operation();
                operation.operator = "+";
                clauses.push(operation);

                line = line.substring(match.length);
            } else if (line.match(Token.OperatorMultiply)) {
                // @ts-ignore
                let match = line.match(Token.OperatorMultiply)[0];

                let operation: Operation = new Operation();
                operation.operator = "*";
                clauses.push(operation);

                line = line.substring(match.length);
            } else if (line.match(Token.ParenthesisOpen)) {
                // @ts-ignore
                let match = line.match(Token.ParenthesisOpen)[0];

                clauses = reduce(clauses);

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

                clauses = reduce(clauses);

                line = line.substring(match.length);
            }
        }

        clauses = reduce(clauses);

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

