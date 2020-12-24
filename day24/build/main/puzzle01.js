"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 24, Puzzle 01!");
const line_reader_1 = __importDefault(require("line-reader"));
class Coordinates {
    constructor() {
        this.verticalOffset = 0;
        this.horizontalOffset = 0;
    }
    e() {
        this.horizontalOffset++;
        return this;
    }
    se() {
        this.horizontalOffset += 0.5;
        this.verticalOffset--;
        return this;
    }
    sw() {
        this.horizontalOffset -= 0.5;
        this.verticalOffset--;
        return this;
    }
    w() {
        this.horizontalOffset--;
        return this;
    }
    nw() {
        this.horizontalOffset -= 0.5;
        this.verticalOffset++;
        return this;
    }
    ne() {
        this.horizontalOffset += 0.5;
        this.verticalOffset++;
        return this;
    }
}
class HexTile {
    constructor(coordinates) {
        this.whiteSideUp = true;
        this.coordinates = coordinates;
    }
    flip() {
        this.whiteSideUp = !this.whiteSideUp;
        console.log("Flipping tile [" + this.coordinates.verticalOffset + "][" + this.coordinates.horizontalOffset + "] to " + (this.whiteSideUp ? "white" : "black"));
    }
}
function main() {
    const hexMap = {};
    const allTiles = [];
    const tileNavs = [];
    line_reader_1.default.eachLine("./input/input.txt", (line, last) => {
        const currentTileNav = [];
        tileNavs.push(currentTileNav);
        while (line.length > 0) {
            let oneChar = line.substring(0, 1);
            let twoChars = line.substring(0, 2);
            if (twoChars === "se" || twoChars === "sw" || twoChars === "nw" || twoChars === "ne") {
                currentTileNav.push(twoChars);
                line = line.substring(2);
            }
            else if (oneChar === "e" || oneChar === "w") {
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
            let blackUp = 0;
            allTiles.forEach(tile => tile.whiteSideUp ? 0 : blackUp++);
            console.log("Result: " + blackUp);
        }
    });
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=puzzle01.js.map