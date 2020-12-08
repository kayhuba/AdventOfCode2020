console.log("Day 08, Puzzle 01!")

import linereader from "line-reader";

interface Instruction {
    operation: string;
    operand: string
}

interface InstructionLine {
    executed: boolean;
    instruction: Instruction
}

interface State {
    accumulator: number
}

function interpret(program: InstructionLine[], state: State) {
    let operandToNumber = (operand: string): number => {
        if (operand.startsWith("-")) {
            return -parseInt(operand.substring(1));
        }

        return parseInt(operand.substring(1));
    };

    let instructionPointer = 0;
    while (!program[instructionPointer].executed) {
        let currentLine = program[instructionPointer];
        currentLine.executed = true;

        let instruction = currentLine.instruction;
        switch (instruction.operation) {
            case "nop": {
                instructionPointer++;
                break;
            }
            case "acc":  {
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
    const program: InstructionLine[] = [];
    linereader.eachLine("./input/input.txt", (line, last) => {
        program.push({
            executed: false,
            instruction: {
                operation: line.substring(0, 3),
                operand: line.substring(4)
            }
        });

        if (last) {
            const state: State = {
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

