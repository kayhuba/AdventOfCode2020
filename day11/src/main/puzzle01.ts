console.log("Day 11, Puzzle 01!")

import linereader from "line-reader";

function main() {
    const frames: string[][][] = [];
    frames[0] = [];
    frames[1] = [];
    let y = 0;

    linereader.eachLine("./input/input.txt", (line, last) => {
        const addEmptyLine = () => {
            frames[0][y].push(".");
            frames[1][y].push(".");

            for (let x=0; x < line.length; x++) {
                frames[0][y].push(".");
                frames[1][y].push(".");
            }

            frames[0][y].push(".");
            frames[1][y].push(".");
        };

        if (y === 0) {
            frames[0][y] = [];
            frames[1][y] = [];

            addEmptyLine();
            y++;
        }

        frames[0][y] = [];
        frames[1][y] = [];

        frames[0][y].push(".");
        frames[1][y].push(".");
        for (let x=0; x < line.length; x++) {
            frames[0][y].push(line.charAt(x));
            frames[1][y].push(line.charAt(x));
        }
        frames[0][y].push(".");
        frames[1][y].push(".");
        y++;

        if (last) {
            frames[0][y] = [];
            frames[1][y] = [];

            addEmptyLine();
            y++;

            const animateFrame = (activeFrame: number): { occupiedCount: number, changes: number }  => {
                const renderFrame = 1 - activeFrame;
                let occupied = 0;
                let changes = 0;

                for (let y=1; y < frames[renderFrame].length - 1; y++) {
                    for (let x=1; x < frames[renderFrame][y].length - 1; x++) {
                        let occupiedCount = 0;
                        occupiedCount += (frames[activeFrame][y - 1][x - 1] === "#" ? 1 : 0);
                        occupiedCount += (frames[activeFrame][y - 1][x    ] === "#" ? 1 : 0);
                        occupiedCount += (frames[activeFrame][y - 1][x + 1] === "#" ? 1 : 0);
                        occupiedCount += (frames[activeFrame][y    ][x - 1] === "#" ? 1 : 0);
                        occupiedCount += (frames[activeFrame][y    ][x + 1] === "#" ? 1 : 0);
                        occupiedCount += (frames[activeFrame][y + 1][x - 1] === "#" ? 1 : 0);
                        occupiedCount += (frames[activeFrame][y + 1][x    ] === "#" ? 1 : 0);
                        occupiedCount += (frames[activeFrame][y + 1][x + 1] === "#" ? 1 : 0);

                        if (frames[activeFrame][y][x] === "L" && occupiedCount === 0) {
                            frames[renderFrame][y][x] = "#";
                            changes++;
                            occupied++;
                        } else if (frames[activeFrame][y][x] === "#" && occupiedCount > 3) {
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

