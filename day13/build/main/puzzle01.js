"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 13, Puzzle 01!");
const line_reader_1 = __importDefault(require("line-reader"));
function main() {
    let nextDepartureTimestamp;
    const busIds = [];
    line_reader_1.default.eachLine("./input/input.txt", (line, last) => {
        if (!nextDepartureTimestamp) {
            nextDepartureTimestamp = parseInt(line);
            return;
        }
        const busIdsWithInvalid = line.split(",");
        busIdsWithInvalid.forEach(busIdsWithInvalid => {
            if (busIdsWithInvalid === "x") {
                return;
            }
            busIds.push(parseInt(busIdsWithInvalid));
        });
        let smallestWaitTime = {
            id: -1,
            waitTime: Number.MAX_VALUE
        };
        for (let i = 0; i < busIds.length; i++) {
            let timeToDeparture;
            if (nextDepartureTimestamp < busIds[i]) {
                timeToDeparture = busIds[i];
            }
            else {
                timeToDeparture = nextDepartureTimestamp % busIds[i];
            }
            timeToDeparture = busIds[i] - timeToDeparture;
            if (timeToDeparture < smallestWaitTime.waitTime) {
                smallestWaitTime.id = busIds[i];
                smallestWaitTime.waitTime = timeToDeparture;
            }
        }
        console.log("Result: " + (smallestWaitTime.id * smallestWaitTime.waitTime));
    });
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=puzzle01.js.map