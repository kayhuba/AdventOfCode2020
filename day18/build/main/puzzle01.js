"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 18, Puzzle 01!");
const line_reader_1 = __importDefault(require("line-reader"));
class NumberExpression {
    constructor(number) {
        this.number = number;
    }
    evaluate() {
        return this.number;
    }
}
class Operation {
    evaluate() {
        if (this.left === undefined) {
            throw new Error("Left operand was undefined at time of evaluation");
        }
        if (this.right === undefined) {
            throw new Error("Right operand was undefined at time of evaluation");
        }
        if (this.operator === "*") {
            return this.left.evaluate() * this.right.evaluate();
        }
        else if (this.operator === "+") {
            return this.left.evaluate() + this.right.evaluate();
        }
        else {
            throw new Error("Invalid operator");
        }
    }
}
class ParenthesisExpression {
    evaluate() {
        if (this.containedExpression === undefined) {
            throw new Error("Invalid parenthesis expression (no content)");
        }
        return this.containedExpression.evaluate();
    }
}
var Token;
(function (Token) {
    Token["Whitespace"] = "^\\s+";
    Token["Number"] = "^\\d+";
    Token["ParenthesisOpen"] = "^\\(";
    Token["ParenthesisClose"] = "^\\)";
    Token["OperatorAdd"] = "^\\+";
    Token["OperatorMultiply"] = "^\\*";
})(Token || (Token = {}));
function main() {
    let sumOfAllLineResults = 0;
    line_reader_1.default.eachLine("./input/input.txt", (line, last) => {
        const clauses = [];
        while (line.length > 0) {
            if (line.match(Token.Whitespace)) {
                // @ts-ignore
                let match = line.match(Token.Whitespace)[0];
                line = line.substring(match.length);
            }
            else if (line.match(Token.Number)) {
                // @ts-ignore
                let match = line.match(Token.Number)[0];
                let number = new NumberExpression(parseInt(match));
                let lastExpression = clauses[clauses.length - 1];
                if (lastExpression !== undefined && lastExpression instanceof Operation) {
                    lastExpression.right = number;
                }
                else {
                    clauses.push(number);
                }
                line = line.substring(match.length);
            }
            else if (line.match(Token.OperatorAdd)) {
                // @ts-ignore
                let match = line.match(Token.OperatorAdd)[0];
                let operation = new Operation();
                operation.left = clauses.pop();
                operation.operator = "+";
                clauses.push(operation);
                line = line.substring(match.length);
            }
            else if (line.match(Token.OperatorMultiply)) {
                // @ts-ignore
                let match = line.match(Token.OperatorMultiply)[0];
                let operation = new Operation();
                operation.left = clauses.pop();
                operation.operator = "*";
                clauses.push(operation);
                line = line.substring(match.length);
            }
            else if (line.match(Token.ParenthesisOpen)) {
                // @ts-ignore
                let match = line.match(Token.ParenthesisOpen)[0];
                clauses.push(new ParenthesisExpression());
                line = line.substring(match.length);
            }
            else if (line.match(Token.ParenthesisClose)) {
                // @ts-ignore
                let match = line.match(Token.ParenthesisClose)[0];
                let containedExpression = clauses.pop();
                let parenthesisExpression = clauses.pop();
                parenthesisExpression.containedExpression = containedExpression;
                let lastExpression = clauses[clauses.length - 1];
                if (lastExpression !== undefined && lastExpression instanceof Operation) {
                    lastExpression.right = parenthesisExpression;
                }
                else {
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
//# sourceMappingURL=puzzle01.js.map