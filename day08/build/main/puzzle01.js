"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 08, Puzzle 01!");
var line_reader_1 = __importDefault(require("line-reader"));
function interpret(program, state) {
    var operandToNumber = function (operand) {
        if (operand.startsWith("-")) {
            return -parseInt(operand.substring(1));
        }
        return parseInt(operand.substring(1));
    };
    var instructionPointer = 0;
    while (!program[instructionPointer].executed) {
        var currentLine = program[instructionPointer];
        currentLine.executed = true;
        var instruction = currentLine.instruction;
        switch (instruction.operation) {
            case "nop": {
                instructionPointer++;
                break;
            }
            case "acc": {
                state.accumulator += operandToNumber(instruction.operand);
                instructionPointer++;
                break;
            }
            case "jmp": {
                instructionPointer += operandToNumber(instruction.operand);
                break;
            }
        }
    }
}
function main() {
    var program = [];
    line_reader_1.default.eachLine("./input/input.txt", function (line, last) {
        program.push({
            executed: false,
            instruction: {
                operation: line.substring(0, 3),
                operand: line.substring(4)
            }
        });
        if (last) {
            var state = {
                accumulator: 0
            };
            interpret(program, state);
            console.log("Result: " + state.accumulator);
        }
    });
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=puzzle01.js.map