"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 24, Puzzle 01!");
const line_reader_1 = __importDefault(require("line-reader"));
class HexTile {
    constructor() {
        this.whiteSideUp = true;
    }
    flip() {
        this.whiteSideUp = !this.whiteSideUp;
    }
    e() {
        if (!this.east) {
            this.east = new HexTile();
        }
        return this.east;
    }
    se() {
        if (!this.southEast) {
            this.southEast = new HexTile();
        }
        return this.southEast;
    }
    sw() {
        if (!this.southWest) {
            this.southWest = new HexTile();
        }
        return this.southWest;
    }
    w() {
        if (!this.west) {
            this.west = new HexTile();
        }
        return this.west;
    }
    nw() {
        if (!this.northWest) {
            this.northWest = new HexTile();
        }
        return this.northWest;
    }
    ne() {
        if (!this.northEast) {
            this.northEast = new HexTile();
        }
        return this.northEast;
    }
}
function main() {
    const refTile = new HexTile();
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
            let currentTile = refTile;
            tileNavs.forEach(tileNav => {
                tileNav.forEach(navStep => {
                    currentTile = currentTile[navStep]();
                });
                currentTile.flip();
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