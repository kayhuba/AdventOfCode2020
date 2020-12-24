console.log("Day 24, Puzzle 01!")

import linereader from "line-reader";

type NavStep = "e" | "se" | "sw" | "w" | "nw" | "ne";

interface HexHorizontalCoordinates {
    [x: number]: HexTile;
}

interface HexMap {
    [y: number]: HexHorizontalCoordinates;
}

class Coordinates {
    verticalOffset: number = 0;
    horizontalOffset: number = 0;

    e(): Coordinates {
        this.horizontalOffset++;
        return this;
    }

    se(): Coordinates {
        this.horizontalOffset += 0.5;
        this.verticalOffset--;
        return this;
    }

    sw(): Coordinates {
        this.horizontalOffset -= 0.5;
        this.verticalOffset--;
        return this;
    }

    w(): Coordinates {
        this.horizontalOffset--;
        return this;
    }

    nw(): Coordinates {
        this.horizontalOffset -= 0.5;
        this.verticalOffset++;
        return this;
    }

    ne(): Coordinates {
        this.horizontalOffset += 0.5;
        this.verticalOffset++;
        return this;
    }
}

class HexTile {
    whiteSideUp: boolean = true;
    coordinates: Coordinates;

    constructor(coordinates: Coordinates) {
        this.coordinates = coordinates;
}

    flip(): void {
        this.whiteSideUp = !this.whiteSideUp;
        console.log("Flipping tile [" + this.coordinates.verticalOffset + "][" + this.coordinates.horizontalOffset + "] to " + (this.whiteSideUp ? "white" : "black"));
    }
}

function main() {

    const hexMap: HexMap = {};
    const allTiles: HexTile[] = [];
    const tileNavs: NavStep[][] = [];
    linereader.eachLine("./input/input.txt", (line, last) => {
        const currentTileNav: NavStep[] = [];
        tileNavs.push(currentTileNav);
        while (line.length > 0) {
            let oneChar = line.substring(0, 1);
            let twoChars = line.substring(0, 2);
            if (twoChars === "se" || twoChars === "sw" || twoChars === "nw" || twoChars === "ne") {
                currentTileNav.push(twoChars);
                line = line.substring(2);
            } else if (oneChar === "e" || oneChar === "w") {
                currentTileNav.push(oneChar);
                line = line.substring(1);
            }
        }

        if (last) {
            hexMap[0] = {};
            hexMap[0][0] = new HexTile(new Coordinates());
            allTiles.push(hexMap[0][0]);

            tileNavs.forEach(tileNav => {
                let coordinates = new Coordinates();
                tileNav.forEach(navStep => {
                    coordinates = coordinates[navStep]();
                });

                if (!hexMap[coordinates.verticalOffset]) {
                    hexMap[coordinates.verticalOffset] = {};
                }

                let tile = hexMap[coordinates.verticalOffset][coordinates.horizontalOffset];
                if (!tile) {
                    tile = new HexTile(coordinates);
                    hexMap[coordinates.verticalOffset][coordinates.horizontalOffset] = tile;
                    allTiles.push(tile);
                }
                tile.flip();
            });

            let blackUp: number = 0;
            allTiles.forEach(tile => tile.whiteSideUp ? 0 : blackUp++);

            console.log("Result: " + blackUp);
        }
    });
}

if (require.main === module) {
    main();
}

