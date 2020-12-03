console.log("Day 03, Puzzle 02!")

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

export function travelSlope(geologyGrid: boolean[][], travelX: number, travelY: number): number {
    let x=0;
    let y=0;
    let treeCount = 0;
    while (y < geologyGrid.length) {
        if (isTreeAt(geologyGrid, x, y)) {
            treeCount++;
        }

        x += travelX;
        y += travelY;
    }

    return treeCount;
}

function main() {
    let geologyGrid: boolean[][] = [];
    linereader.eachLine("./input/input.txt", (line, last) => {
        geologyGrid.push(readLine(line));

        if (last) {
            let treeCount = 0;
            let slopeOneTreeCount = travelSlope(geologyGrid, 1, 1);
            let slopeTwoTreeCount = travelSlope(geologyGrid, 3, 1);
            let slopeThreeTreeCount = travelSlope(geologyGrid, 5, 1);
            let slopeFourTreeCount = travelSlope(geologyGrid, 7, 1);
            let slopeFiveTreeCount = travelSlope(geologyGrid, 1, 2);
            console.log("Result: " + (slopeOneTreeCount * slopeTwoTreeCount * slopeThreeTreeCount * slopeFourTreeCount * slopeFiveTreeCount));
        }
    });
}

if (require.main === module) {
    main();
}

