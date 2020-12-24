"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 24, Puzzle 02!");
const line_reader_1 = __importDefault(require("line-reader"));
class Coordinates {
    constructor(verticalOffset, horizontalOffset) {
        this.verticalOffset = 0;
        this.horizontalOffset = 0;
        if (verticalOffset !== undefined) {
            this.verticalOffset = verticalOffset;
        }
        if (horizontalOffset !== undefined) {
            this.horizontalOffset = horizontalOffset;
        }
    }
    e() {
        return new Coordinates(this.verticalOffset, this.horizontalOffset + 1);
    }
    se() {
        return new Coordinates(this.verticalOffset - 1, this.horizontalOffset + 0.5);
    }
    sw() {
        return new Coordinates(this.verticalOffset - 1, this.horizontalOffset - 0.5);
    }
    w() {
        return new Coordinates(this.verticalOffset, this.horizontalOffset - 1);
    }
    nw() {
        return new Coordinates(this.verticalOffset + 1, this.horizontalOffset - 0.5);
    }
    ne() {
        return new Coordinates(this.verticalOffset + 1, this.horizontalOffset + 0.5);
    }
}
class HexTile {
    constructor(coordinates) {
        this.whiteSideUp = true;
        this.coordinates = coordinates;
    }
    getCoordinates() {
        return new Coordinates(this.coordinates.verticalOffset, this.coordinates.horizontalOffset);
    }
    getNeighborCoordinates() {
        const neighbours = [];
        neighbours.push(this.coordinates.e());
        neighbours.push(this.coordinates.se());
        neighbours.push(this.coordinates.sw());
        neighbours.push(this.coordinates.w());
        neighbours.push(this.coordinates.nw());
        neighbours.push(this.coordinates.ne());
        return neighbours;
    }
    flip() {
        this.whiteSideUp = !this.whiteSideUp;
    }
}
function main() {
    const hexMap = [];
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
            let activeMap = 0;
            const resetHexMap = (mapIndex) => {
                hexMap[mapIndex] = {};
                hexMap[mapIndex][0] = {};
            };
            const resetAllTiles = (mapIndex) => {
                allTiles[mapIndex] = [];
            };
            const cleanupMap = (mapIndex) => {
                for (let i = allTiles[mapIndex].length - 1; i >= 0; i--) {
                    let tile = allTiles[mapIndex][i];
                    if (tile.whiteSideUp) {
                        allTiles[mapIndex].splice(i, 1);
                        delete hexMap[mapIndex][tile.getCoordinates().verticalOffset][tile.getCoordinates().horizontalOffset];
                    }
                }
            };
            hexMap.push([]);
            hexMap.push([]);
            resetHexMap(activeMap);
            hexMap[activeMap][0][0] = new HexTile(new Coordinates());
            allTiles.push([]);
            allTiles.push([]);
            resetAllTiles(activeMap);
            allTiles[activeMap].push(hexMap[activeMap][0][0]);
            tileNavs.forEach(tileNav => {
                let coordinates = new Coordinates();
                tileNav.forEach(navStep => {
                    coordinates = coordinates[navStep]();
                });
                if (!hexMap[activeMap][coordinates.verticalOffset]) {
                    hexMap[activeMap][coordinates.verticalOffset] = {};
                }
                let tile = hexMap[activeMap][coordinates.verticalOffset][coordinates.horizontalOffset];
                if (!tile) {
                    tile = new HexTile(coordinates);
                    hexMap[activeMap][coordinates.verticalOffset][coordinates.horizontalOffset] = tile;
                    allTiles[activeMap].push(tile);
                }
                tile.flip();
            });
            // day0 ready - next up: daily flips
            const isTileWhite = (coordinates, mapIndex) => {
                if (getSafeTile(coordinates, mapIndex) === undefined) {
                    return true;
                }
                return hexMap[mapIndex][coordinates.verticalOffset][coordinates.horizontalOffset].whiteSideUp;
            };
            const getSafeTile = (coordinates, mapIndex) => {
                if (!hexMap[mapIndex][coordinates.verticalOffset]) {
                    return undefined;
                }
                return hexMap[mapIndex][coordinates.verticalOffset][coordinates.horizontalOffset];
            };
            const applyRuleFor = (tile, activeMap, observeMap) => {
                if (getSafeTile(tile.getCoordinates(), activeMap) !== undefined) {
                    return;
                }
                let blackTileCount = 0;
                tile.getNeighborCoordinates().forEach(neighborCoordinates => {
                    blackTileCount += isTileWhite(neighborCoordinates, observeMap) ? 0 : 1;
                });
                const newTile = new HexTile(tile.getCoordinates());
                if (tile.whiteSideUp) {
                    if (blackTileCount === 2) {
                        newTile.whiteSideUp = false;
                    }
                }
                else {
                    if (blackTileCount === 1 || blackTileCount === 2) {
                        newTile.whiteSideUp = false;
                    }
                }
                // we know for sure now whether this new tile is black or white. We set it in either case such that it's not observed anymore in this round
                if (!hexMap[activeMap][newTile.getCoordinates().verticalOffset]) {
                    hexMap[activeMap][newTile.getCoordinates().verticalOffset] = {};
                }
                hexMap[activeMap][newTile.getCoordinates().verticalOffset][newTile.getCoordinates().horizontalOffset] = newTile;
                allTiles[activeMap].push(newTile);
            };
            let blackUp = 0;
            for (let day = 1; day <= 100; day++) {
                blackUp = 0;
                let observeMap = activeMap;
                activeMap = 1 - activeMap;
                cleanupMap(observeMap);
                resetHexMap(activeMap);
                resetAllTiles(activeMap);
                allTiles[observeMap].forEach(tile => {
                    applyRuleFor(tile, activeMap, observeMap);
                    tile.getNeighborCoordinates().forEach(neighborCoordinate => {
                        if (getSafeTile(neighborCoordinate, activeMap) !== undefined) {
                            return;
                        }
                        let tile = getSafeTile(neighborCoordinate, observeMap);
                        if (tile === undefined) {
                            tile = new HexTile(neighborCoordinate);
                        }
                        applyRuleFor(tile, activeMap, observeMap);
                    });
                });
                // final calculation
                allTiles[activeMap].forEach(tile => tile.whiteSideUp ? 0 : blackUp++);
                console.log("Day " + day + ": " + blackUp);
            }
            console.log("Result: " + blackUp);
        }
    });
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=puzzle02.js.map