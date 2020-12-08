console.log("Day 08, Puzzle 02!")

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

function interpret(program: InstructionLine[], state: State, programFlow: number[]): boolean {
    let operandToNumber = (operand: string): number => {
        if (operand.startsWith("-")) {
            return -parseInt(operand.substring(1));
        }

        return parseInt(operand.substring(1));
    };

    const programLen = program.length;
    let instructionPointer = 0;
    while (instructionPointer < programLen && !program[instructionPointer].executed) {
        let currentLine = program[instructionPointer];
        currentLine.executed = true;

        let instruction = currentLine.instruction;
        switch (instruction.operation) {
            case "nop": {
                programFlow.push(instructionPointer);
                instructionPointer++;
                break;
            }
            case "acc":  {
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

function clone(program: InstructionLine[]): InstructionLine[] {
    let copy = program.slice();
    for (let i=0; i < copy.length; i++) {
        copy[i] = {
            executed: false,
            instruction: {
                operation: copy[i].instruction.operation,
                operand: copy[i].instruction.operand
            }
        }
    }

    return copy;
}

function main() {
    const program: InstructionLine[] = [];
    const programFlow: number[] = [];
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

            let result;
            let fixIndex = 0;
            result = interpret(program, state, programFlow);
            while (!result) {
                state.accumulator = 0;
                let testProgram = clone(program);
                let instruction;
                do {
                  instruction  = testProgram[programFlow[fixIndex++]].instruction;
                } while (instruction.operand === "+0" || instruction.operand === "-0");

                if (instruction.operation === "nop") {
                    instruction.operation = "jmp";
                } else if (instruction.operation === "jmp") {
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

