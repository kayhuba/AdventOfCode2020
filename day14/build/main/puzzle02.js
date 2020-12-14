"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 14, Puzzle 02!");
const line_reader_1 = __importDefault(require("line-reader"));
function main() {
    let orMask = 0n;
    let floatingPositions = [];
    const memory = [];
    const memoryObj = {};
    let maskRaw;
    let maxOffset = 0;
    line_reader_1.default.eachLine("./input/input.txt", (line, last) => {
        if (line.startsWith("mask")) {
            orMask = 0n;
            floatingPositions = [];
            maskRaw = line.substring("mask = ".length);
            console.log("New mask: " + maskRaw);
            for (let i = 0; i < maskRaw.length; i++) {
                if (maskRaw.charAt(i) === "1") {
                    orMask = (orMask | (1n << BigInt(maskRaw.length - i - 1)));
                }
                else if (maskRaw.charAt(i) === "X") {
                    floatingPositions.push(BigInt(maskRaw.length - i - 1));
                }
            }
        }
        else if (line.startsWith("mem")) {
            console.log("Handling memory assignment: " + line);
            let offsetRef = BigInt(parseInt(line.substring("mem[".length)));
            const keyValue = line.split(" = ");
            const value = BigInt(parseInt(keyValue[1]));
            console.log("Offset: " + offsetRef.toString(2));
            // offset with masks
            for (let counter = 0n; counter < (1n << BigInt(floatingPositions.length)); counter++) {
                let floatingOrMask = 0n;
                let floatingAndMask = (1n << 36n) - 1n;
                for (let i = 0; i < floatingPositions.length; i++) {
                    floatingOrMask = floatingOrMask | ((counter & (1n << BigInt(i))) << floatingPositions[floatingPositions.length - i - 1] - BigInt(i));
                    floatingAndMask = floatingAndMask & ((1n << 36n) - 1n) ^ (1n << floatingPositions[floatingPositions.length - i - 1]);
                }
                let offset = offsetRef & floatingAndMask | orMask | floatingOrMask;
                maxOffset = Math.max(maxOffset, Number(offset));
                memory[Number(offset)] = value;
                memoryObj[Number(offset)] = value;
            }
        }
        if (last) {
            console.log("Calculating sum of all values");
            let valueSum = 0n;
            Object.values(memoryObj).forEach(value => valueSum += value);
            console.log("Result: " + valueSum);
        }
    });
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=puzzle02.js.map