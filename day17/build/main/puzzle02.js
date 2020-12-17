"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 17, Puzzle 02!");
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
    let centerW = 0;
    let xywSizeAfterCycles = -1;
    let zSizeAfterCycles = -1;
    const init = (initialSize) => {
        if (initialized) {
            return;
        }
        //        xywSizeAfterCycles = 11;
        //        zSizeAfterCycles = 5;
        xywSizeAfterCycles = cycles * 2 + initialSize;
        zSizeAfterCycles = cycles * 2 + 1;
        initGrid(0);
        initGrid(1);
        centerX = Math.floor(xywSizeAfterCycles / 2);
        centerY = Math.floor(xywSizeAfterCycles / 2);
        centerW = Math.floor(xywSizeAfterCycles / 2);
        centerZ = Math.floor(zSizeAfterCycles / 2);
        y = Math.floor((xywSizeAfterCycles - initialSize) / 2);
        initialized = true;
    };
    const initGrid = (frame) => {
        grid[frame] = [];
        for (let w = 0; w < xywSizeAfterCycles; w++) {
            grid[frame][w] = [];
            for (let z = 0; z < zSizeAfterCycles; z++) {
                grid[frame][w][z] = [];
                for (let y = 0; y < xywSizeAfterCycles; y++) {
                    grid[frame][w][z][y] = [];
                    for (let x = 0; x < xywSizeAfterCycles; x++) {
                        grid[frame][w][z][y][x] = false;
                    }
                }
            }
        }
    };
    const printGrid = (frame) => {
        for (let w = 0; w < grid[frame].length; w++) {
            console.log("w=" + (w - Math.floor(grid[frame].length / 2)));
            for (let z = 0; z < grid[frame][w].length; z++) {
                console.log("z=" + (z - Math.floor(grid[frame][w].length / 2)));
                for (let y = 0; y < grid[frame][w][z].length; y++) {
                    let line = "";
                    for (let x = 0; x < grid[frame][w][z][y].length; x++) {
                        line += (grid[frame][w][z][y][x] ? "#" : ".");
                    }
                    console.log(line);
                }
            }
        }
    };
    const safeGetActive = (frame, x, y, z, w) => {
        if (x < 0 || x >= xywSizeAfterCycles) {
            return false;
        }
        if (y < 0 || y >= xywSizeAfterCycles) {
            return false;
        }
        if (z < 0 || z >= zSizeAfterCycles) {
            return false;
        }
        if (w < 0 || w >= xywSizeAfterCycles) {
            return false;
        }
        return grid[frame][w][z][y][x];
    };
    const countActiveNeighbours = (frame, x, y, z, w) => {
        const offset = [-1, 0, +1];
        let activeNeighbours = 0;
        if (grid[frame][w][z][y][x]) {
            activeNeighbours--;
        }
        for (let i = 0; i < offset.length; i++) {
            for (let j = 0; j < offset.length; j++) {
                for (let k = 0; k < offset.length; k++) {
                    for (let l = 0; l < offset.length; l++) {
                        safeGetActive(frame, x + offset[l], y + offset[k], z + offset[j], w + offset[i]) ? activeNeighbours++ : 0;
                    }
                }
            }
        }
        return activeNeighbours;
    };
    const cycle = () => {
        const oldFrame = activeFrame;
        activeFrame = 1 - activeFrame;
        for (let w = 0; w < xywSizeAfterCycles; w++) {
            for (let z = 0; z < zSizeAfterCycles; z++) {
                for (let y = 0; y < xywSizeAfterCycles; y++) {
                    for (let x = 0; x < xywSizeAfterCycles; x++) {
                        let activeNeighbours = countActiveNeighbours(oldFrame, x, y, z, w);
                        if (grid[oldFrame][w][z][y][x]) {
                            if (activeNeighbours === 2 || activeNeighbours === 3) {
                                grid[activeFrame][w][z][y][x] = true;
                            }
                            else {
                                grid[activeFrame][w][z][y][x] = false;
                            }
                        }
                        else {
                            if (activeNeighbours === 3) {
                                grid[activeFrame][w][z][y][x] = true;
                            }
                            else {
                                grid[activeFrame][w][z][y][x] = false;
                            }
                        }
                    }
                }
            }
        }
    };
    line_reader_1.default.eachLine("./input/input.txt", (line, last) => {
        init(line.length);
        for (let i = 0; i < line.length; i++) {
            grid[0][centerW][centerZ][y][i + Math.floor((xywSizeAfterCycles - line.length) / 2)] = line.charAt(i) === "#";
            grid[1][centerW][centerZ][y][i + Math.floor((xywSizeAfterCycles - line.length) / 2)] = line.charAt(i) === "#";
        }
        y++;
        if (last) {
            //            printGrid(activeFrame);
            let cycleCount;
            for (cycleCount = 0; cycleCount < cycles; cycleCount++) {
                cycle();
                //                console.log("\nGrid after " + (cycleCount + 1) + " cycles");
                //                printGrid(activeFrame);
            }
            let activeCubes = 0;
            for (let w = 0; w < xywSizeAfterCycles; w++) {
                for (let z = 0; z < zSizeAfterCycles; z++) {
                    for (let y = 0; y < xywSizeAfterCycles; y++) {
                        for (let x = 0; x < xywSizeAfterCycles; x++) {
                            grid[activeFrame][w][z][y][x] ? activeCubes++ : 0;
                        }
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
//# sourceMappingURL=puzzle02.js.map