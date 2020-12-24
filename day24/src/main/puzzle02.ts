console.log("Day 24, Puzzle 02!")

import linereader from "line-reader";

type NavStep = "e" | "se" | "sw" | "w" | "nw" | "ne";

interface HexHorizontalCoordinates {
    [x: number]: HexTile;
}

interface HexMap {
    [y: number]: HexHorizontalCoordinates;
}

class Coordinates {
    readonly verticalOffset: number = 0;
    readonly horizontalOffset: number = 0;

    constructor(verticalOffset?: number, horizontalOffset?: number) {
        if (verticalOffset !== undefined) {
            this.verticalOffset = verticalOffset;
        }

        if (horizontalOffset !== undefined) {
            this.horizontalOffset = horizontalOffset;
        }
    }

    e(): Coordinates {
        return new Coordinates(this.verticalOffset, this.horizontalOffset + 1);
    }

    se(): Coordinates {
        return new Coordinates(this.verticalOffset - 1, this.horizontalOffset + 0.5);
    }

    sw(): Coordinates {
        return new Coordinates(this.verticalOffset - 1, this.horizontalOffset - 0.5);
    }

    w(): Coordinates {
        return new Coordinates(this.verticalOffset, this.horizontalOffset - 1);
    }

    nw(): Coordinates {
        return new Coordinates(this.verticalOffset + 1, this.horizontalOffset - 0.5);
    }

    ne(): Coordinates {
        return new Coordinates(this.verticalOffset + 1, this.horizontalOffset + 0.5);
    }
}

class HexTile {
    whiteSideUp: boolean = true;
    private coordinates: Coordinates;

    constructor(coordinates: Coordinates) {
        this.coordinates = coordinates;
    }

    getCoordinates(): Coordinates {
        return new Coordinates(this.coordinates.verticalOffset, this.coordinates.horizontalOffset);
    }

    getNeighborCoordinates(): Coordinates[] {
        const neighbours: Coordinates[] = [];
        neighbours.push(this.coordinates.e());
        neighbours.push(this.coordinates.se());
        neighbours.push(this.coordinates.sw());
        neighbours.push(this.coordinates.w());
        neighbours.push(this.coordinates.nw());
        neighbours.push(this.coordinates.ne());
        return neighbours;
    }

    flip(): void {
        this.whiteSideUp = !this.whiteSideUp;
    }
}

function main() {

    const hexMap: HexMap[] = [];
    const allTiles: HexTile[][] = [];
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
            let activeMap: number = 0;
            const resetHexMap = (mapIndex: number) => {
                hexMap[mapIndex] = {};
                hexMap[mapIndex][0] = {};
            };

            const resetAllTiles = (mapIndex: number) => {
                allTiles[mapIndex] = [];
            };

            const cleanupMap = (mapIndex: number) => {
                for (let i=allTiles[mapIndex].length - 1; i >= 0; i--) {
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
            const isTileWhite = (coordinates: Coordinates, mapIndex: number): boolean => {
                if (getSafeTile(coordinates, mapIndex) === undefined) {
                    return true;
                }

                return hexMap[mapIndex][coordinates.verticalOffset][coordinates.horizontalOffset].whiteSideUp;
            };

            const getSafeTile = (coordinates: Coordinates, mapIndex: number): HexTile | undefined => {
                if (!hexMap[mapIndex][coordinates.verticalOffset]) {
                    return undefined;
                }

                return hexMap[mapIndex][coordinates.verticalOffset][coordinates.horizontalOffset];
            };

            const applyRuleFor = (tile: HexTile, activeMap: number, observeMap: number): void => {
                if (getSafeTile(tile.getCoordinates(), activeMap) !== undefined) {
                    return;
                }

                let blackTileCount = 0;
                tile.getNeighborCoordinates().forEach(neighborCoordinates => {
                    blackTileCount += isTileWhite(neighborCoordinates, observeMap) ? 0 : 1;
                });

                const newTile: HexTile = new HexTile(tile.getCoordinates());
                if (tile.whiteSideUp) {
                    if (blackTileCount === 2) {
                        newTile.whiteSideUp = false;
                    }
                } else {
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

            let blackUp: number = 0;
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

                        let tile: HexTile | undefined = getSafeTile(neighborCoordinate, observeMap);
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

