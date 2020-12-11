console.log("Day 11, Puzzle 02!")

import linereader from "line-reader";

function main() {
    const frames: string[][][] = [];
    frames[0] = [];
    frames[1] = [];
    let y = 0;

    linereader.eachLine("./input/input.txt", (line, last) => {
        frames[0][y] = [];
        frames[1][y] = [];

        for (let x=0; x < line.length; x++) {
            frames[0][y].push(line.charAt(x));
            frames[1][y].push(line.charAt(x));
        }
        y++;

        if (last) {
            const countIfOccupied = (activeFrame: number, x: number, y: number): number => {
                if (x < 0 || x >= frames[activeFrame][0].length) {
                    return 0;
                }

                if (y < 0 || y >= frames[activeFrame].length) {
                    return 0;
                }

                return (frames[activeFrame][y][x] === "#") ? 1 : 0;
            }

            const isSeat = (activeFrame: number, x: number, y: number): boolean => {
                if (x < 0 || x >= frames[activeFrame][0].length) {
                    return false;
                }

                if (y < 0 || y >= frames[activeFrame].length) {
                    return false;
                }

                return frames[activeFrame][y][x] === "#" || frames[activeFrame][y][x] === "L";
            }

            const animateFrame = (activeFrame: number): { occupiedCount: number, changes: number }  => {
                const renderFrame = 1 - activeFrame;
                let occupied = 0;
                let changes = 0;

                for (let y=0; y < frames[renderFrame].length; y++) {
                    for (let x=0; x < frames[renderFrame][y].length; x++) {
                        let occupiedCount = 0;

                        // walk diagonal up left until found
                        for (let r=1; x - r >= 0 && y - r >= 0; r++) {
                            if (isSeat(activeFrame, x - r, y - r)) {
                                occupiedCount += countIfOccupied(activeFrame, x - r, y - r);
                                break;
                            }
                        }

                        // walk left until found
                        for (let r=1; x - r >= 0; r++) {
                            if (isSeat(activeFrame, x - r, y)) {
                                occupiedCount += countIfOccupied(activeFrame, x - r, y);
                                break;
                            }
                        }

                        // walk diagonal left down until found
                        for (let r=1; x - r >= 0 && y + r < frames[activeFrame].length; r++) {
                            if (isSeat(activeFrame, x - r, y + r)) {
                                occupiedCount += countIfOccupied(activeFrame, x - r, y + r);
                                break;
                            }
                        }

                        // walk up until found
                        for (let r=1; y - r >= 0; r++) {
                            if (isSeat(activeFrame, x, y - r)) {
                                occupiedCount += countIfOccupied(activeFrame, x, y - r);
                                break;
                            }
                        }

                        // walk down until found
                        for (let r=1; y + r < frames[activeFrame].length; r++) {
                            if (isSeat(activeFrame, x, y + r)) {
                                occupiedCount += countIfOccupied(activeFrame, x, y + r);
                                break;
                            }
                        }

                        // walk diagonal up right until found
                        for (let r=1; x + r < frames[activeFrame][0].length && y - r >= 0; r++) {
                            if (isSeat(activeFrame, x + r, y - r)) {
                                occupiedCount += countIfOccupied(activeFrame, x + r, y - r);
                                break;
                            }
                        }

                        // walk right until found
                        for (let r=1; x + r < frames[activeFrame][0].length; r++) {
                            if (isSeat(activeFrame, x + r, y)) {
                                occupiedCount += countIfOccupied(activeFrame, x + r, y);
                                break;
                            }
                        }

                        // walk diagonal right down until found
                        for (let r=1; x + r < frames[activeFrame][0].length && y + r < frames[activeFrame].length; r++) {
                            if (isSeat(activeFrame, x + r, y + r)) {
                                occupiedCount += countIfOccupied(activeFrame, x + r, y + r);
                                break;
                            }
                        }


                        if (frames[activeFrame][y][x] === "L" && occupiedCount === 0) {
                            frames[renderFrame][y][x] = "#";
                            changes++;
                            occupied++;
                        } else if (frames[activeFrame][y][x] === "#" && occupiedCount > 4) {
                            frames[renderFrame][y][x] = "L";
                            changes++;
                        } else {
                            frames[renderFrame][y][x] = frames[activeFrame][y][x];
                            if (frames[renderFrame][y][x] === "#") {
                                occupied++;
                            }
                        }
                    }
                }

                return {occupiedCount: occupied, changes: changes};
            };

            let result;
            let activeFrame = 1;

            animateFrame(0);
            do {
                result = animateFrame(activeFrame);
                activeFrame = 1 - activeFrame;
            } while (result.changes > 0);

            console.log("Result: " + result.occupiedCount);
        }
    });
}

if (require.main === module) {
    main();
}

