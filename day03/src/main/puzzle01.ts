console.log("Day 03, Puzzle 01!")

import linereader from "line-reader";

export function readLine(line: string): boolean[] {
    let treeLine: boolean[] = [];
    let n=line.length;
    for (let i=0; i < n; i++) {
        if (line.charAt(i) === "#") {
            treeLine.push(true);
        } else {
            treeLine.push(false);
        }
    }

    return treeLine;
}

export function isTreeAt(geologyGrid: boolean[][], x: number, y: number): boolean {
    let modulo = geologyGrid[y].length;
    return geologyGrid[y][x % modulo];
}

function main() {
    let geologyGrid: boolean[][] = [];
    linereader.eachLine("./input/input.txt", (line, last) => {
        geologyGrid.push(readLine(line));

        if (last) {
            let x = 0;
            let y = 0;
            let treeCount = 0;
            while (y < geologyGrid.length) {
                if (isTreeAt(geologyGrid, x, y)) {
                    treeCount++;
                }

                x += 3;
                y += 1;
            }
            console.log("Result: " + treeCount);
        }
    });
}

if (require.main === module) {
    main();
}

