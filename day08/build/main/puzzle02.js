"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 08, Puzzle 02!");
var line_reader_1 = __importDefault(require("line-reader"));
function interpret(program, state, programFlow) {
    var operandToNumber = function (operand) {
        if (operand.startsWith("-")) {
            return -parseInt(operand.substring(1));
        }
        return parseInt(operand.substring(1));
    };
    var programLen = program.length;
    var instructionPointer = 0;
    while (instructionPointer < programLen && !program[instructionPointer].executed) {
        var currentLine = program[instructionPointer];
        currentLine.executed = true;
        var instruction = currentLine.instruction;
        switch (instruction.operation) {
            case "nop": {
                programFlow.push(instructionPointer);
                instructionPointer++;
                break;
            }
            case "acc": {
                state.accumulator += operandToNumber(instruction.operand);
                instructionPointer++;
                break;
            }
            case "jmp": {
                programFlow.push(instructionPointer);
                instructionPointer += operandToNumber(instruction.operand);
                break;
            }
        }
    }
    return instructionPointer === programLen; // means: program has terminated normally - if it's anything else it "crashed"
}
function clone(program) {
    var copy = program.slice();
    for (var i = 0; i < copy.length; i++) {
        copy[i] = {
            executed: false,
            instruction: {
                operation: copy[i].instruction.operation,
                operand: copy[i].instruction.operand
            }
        };
    }
    return copy;
}
function main() {
    var program = [];
    var programFlow = [];
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
            var result = void 0;
            var fixIndex = 0;
            result = interpret(program, state, programFlow);
            while (!result) {
                state.accumulator = 0;
                var testProgram = clone(program);
                var instruction = void 0;
                do {
                    instruction = testProgram[programFlow[fixIndex++]].instruction;
                } while (instruction.operand === "+0" || instruction.operand === "-0");
                if (instruction.operation === "nop") {
                    instruction.operation = "jmp";
                }
                else if (instruction.operation === "jmp") {
                    instruction.operation = "nop";
                }
                result = interpret(testProgram, state, []);
            }
            console.log("Result: " + state.accumulator);
        }
    });
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=puzzle02.js.map