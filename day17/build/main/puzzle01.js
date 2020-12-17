"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 17, Puzzle 01!");
const line_reader_1 = __importDefault(require("line-reader"));
function main() {
    const cycles = 6;
    const grid = [];
    let activeFrame = 0;
    let initialized = false;
    let y = 0;
    let centerX = 0;
    let centerY = 0;
    let centerZ = 0;
    let xySizeAfterCycles = -1;
    let zSizeAfterCycles = -1;
    const init = (initialSize) => {
        if (initialized) {
            return;
        }
        //        xySizeAfterCycles = 11;
        //        zSizeAfterCycles = 5;
        xySizeAfterCycles = cycles * 2 + initialSize;
        zSizeAfterCycles = cycles * 2 + 1;
        initGrid(0);
        initGrid(1);
        centerX = Math.floor(xySizeAfterCycles / 2);
        centerY = Math.floor(xySizeAfterCycles / 2);
        centerZ = Math.floor(zSizeAfterCycles / 2);
        y = Math.floor((xySizeAfterCycles - initialSize) / 2);
        initialized = true;
    };
    const initGrid = (frame) => {
        grid[frame] = [];
        for (let z = 0; z < zSizeAfterCycles; z++) {
            grid[frame][z] = [];
            for (let y = 0; y < xySizeAfterCycles; y++) {
                grid[frame][z][y] = [];
                for (let x = 0; x < xySizeAfterCycles; x++) {
                    grid[frame][z][y][x] = false;
                }
            }
        }
    };
    const printGrid = (frame) => {
        for (let z = 0; z < grid[frame].length; z++) {
            console.log("z=" + (z - Math.floor(grid[frame].length / 2)));
            for (let y = 0; y < grid[frame][z].length; y++) {
                let line = "";
                for (let x = 0; x < grid[frame][z][y].length; x++) {
                    line += (grid[frame][z][y][x] ? "#" : ".");
                }
                console.log(line);
            }
        }
    };
    const safeGetActive = (frame, x, y, z) => {
        if (x < 0 || x >= xySizeAfterCycles) {
            return false;
        }
        if (y < 0 || y >= xySizeAfterCycles) {
            return false;
        }
        if (z < 0 || z >= zSizeAfterCycles) {
            return false;
        }
        return grid[frame][z][y][x];
    };
    const countActiveNeighbours = (frame, x, y, z) => {
        const offset = [-1, 0, +1];
        let activeNeighbours = 0;
        if (grid[frame][z][y][x]) {
            activeNeighbours--;
        }
        for (let i = 0; i < offset.length; i++) {
            for (let j = 0; j < offset.length; j++) {
                for (let k = 0; k < offset.length; k++) {
                    safeGetActive(frame, x + offset[k], y + offset[j], z + offset[i]) ? activeNeighbours++ : 0;
                }
            }
        }
        return activeNeighbours;
    };
    const cycle = () => {
        const oldFrame = activeFrame;
        activeFrame = 1 - activeFrame;
        for (let z = 0; z < zSizeAfterCycles; z++) {
            for (let y = 0; y < xySizeAfterCycles; y++) {
                for (let x = 0; x < xySizeAfterCycles; x++) {
                    let activeNeighbours = countActiveNeighbours(oldFrame, x, y, z);
                    if (grid[oldFrame][z][y][x]) {
                        if (activeNeighbours === 2 || activeNeighbours === 3) {
                            grid[activeFrame][z][y][x] = true;
                        }
                        else {
                            grid[activeFrame][z][y][x] = false;
                        }
                    }
                    else {
                        if (activeNeighbours === 3) {
                            grid[activeFrame][z][y][x] = true;
                        }
                        else {
                            grid[activeFrame][z][y][x] = false;
                        }
                    }
                }
            }
        }
    };
    line_reader_1.default.eachLine("./input/input.txt", (line, last) => {
        init(line.length);
        for (let i = 0; i < line.length; i++) {
            grid[0][centerZ][y][i + Math.floor((xySizeAfterCycles - line.length) / 2)] = line.charAt(i) === "#";
            grid[1][centerZ][y][i + Math.floor((xySizeAfterCycles - line.length) / 2)] = line.charAt(i) === "#";
        }
        y++;
        if (last) {
            printGrid(activeFrame);
            let cycleCount;
            for (cycleCount = 0; cycleCount < cycles; cycleCount++) {
                cycle();
                //                console.log("\nGrid after " + (cycleCount + 1) + " cycles");
                //                printGrid(activeFrame);
            }
            let activeCubes = 0;
            for (let z = 0; z < zSizeAfterCycles; z++) {
                for (let y = 0; y < xySizeAfterCycles; y++) {
                    for (let x = 0; x < xySizeAfterCycles; x++) {
                        grid[activeFrame][z][y][x] ? activeCubes++ : 0;
                    }
                }
            }
            console.log("Result: " + activeCubes);
        }
    });
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=puzzle01.js.map