console.log("Day 24, Puzzle 01!")

import linereader from "line-reader";

type NavStep = "e" | "se" | "sw" | "w" | "nw" | "ne";

class HexTile {
    whiteSideUp: boolean = true;

    private east?: HexTile;
    private southEast?: HexTile;
    private southWest?: HexTile;
    private west?: HexTile;
    private northWest?: HexTile;
    private northEast?: HexTile;

    flip(): void {
        this.whiteSideUp = !this.whiteSideUp;
    }

    e(): HexTile {
        if (!this.east) {
            this.east = new HexTile();
        }

        return this.east;
    }

    se(): HexTile {
        if (!this.southEast) {
            this.southEast = new HexTile();
        }

        return this.southEast;
    }

    sw(): HexTile {
        if (!this.southWest) {
            this.southWest = new HexTile();
        }

        return this.southWest;
    }

    w(): HexTile {
        if (!this.west) {
            this.west = new HexTile();
        }

        return this.west;
    }

    nw(): HexTile {
        if (!this.northWest) {
            this.northWest = new HexTile();
        }

        return this.northWest;
    }

    ne(): HexTile {
        if (!this.northEast) {
            this.northEast = new HexTile();
        }

        return this.northEast;
    }
}

function main() {

    const refTile: HexTile = new HexTile();
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
            let currentTile = refTile;
            tileNavs.forEach(tileNav => {
                tileNav.forEach(navStep => {
                    currentTile = currentTile[navStep]();
                });
                currentTile.flip();
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

