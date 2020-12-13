console.log("Day 13, Puzzle 01!")

import linereader from "line-reader";

interface BusWaitTime {
    id: number;
    waitTime: number;
}

function main() {
    let nextDepartureTimestamp: number;
    const busIds: number[] = [];
    linereader.eachLine("./input/input.txt", (line, last) => {
        if (!nextDepartureTimestamp) {
            nextDepartureTimestamp = parseInt(line);
            return;
        }

        const busIdsWithInvalid: string[] = line.split(",");
        busIdsWithInvalid.forEach(busIdsWithInvalid => {
            if (busIdsWithInvalid === "x") {
                return;
            }

            busIds.push(parseInt(busIdsWithInvalid));
        });

        let smallestWaitTime: BusWaitTime = {
            id: -1,
            waitTime: Number.MAX_VALUE
        };
        for (let i=0; i < busIds.length; i++) {
            let timeToDeparture: number;
            if (nextDepartureTimestamp < busIds[i]) {
                timeToDeparture = busIds[i];
            } else {
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

