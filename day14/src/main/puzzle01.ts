console.log("Day 14, Puzzle 01!")

import linereader from "line-reader";

function main() {
    let andMask: bigint = BigInt(Math.pow(2,36) - 1);
    let orMask: bigint = 0n;
    const memory: bigint[] = [];
    linereader.eachLine("./input/input.txt", (line, last) => {
        if (line.startsWith("mask")) {
            andMask = BigInt(Math.pow(2,36) - 1);
            orMask = 0n;
            const mask = line.substring("mask = ".length);
            for (let i=0; i < mask.length; i++) {
                if (mask.charAt(i) === "1") {
                    orMask = (orMask | (1n << BigInt(mask.length - i - 1)));
                } else if (mask.charAt(i) === "0") {
                    andMask = (andMask ^ (1n << BigInt(mask.length - i - 1)));
                }
            }
        } else if (line.startsWith("mem")) {
            const offset = parseInt(line.substring("mem[".length));
            let keyValue = line.split(" = ");
            const value = BigInt(parseInt(keyValue[1]));

            memory[offset] = value & andMask | orMask;
        }

        if (last) {
            let valueSum = 0n;
            memory.forEach(value => {
                if (typeof value !== "undefined") {
                    valueSum += value;
                }
            });
            console.log("Result: " + valueSum);
        }
    });
}

if (require.main === module) {
    main();
}

