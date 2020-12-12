import Victor from "victor";

console.log("Day 12, Puzzle 02!")

import linereader from "line-reader";

function main() {
    let waypoint = new Victor(10, 1);
    let position = new Victor(0, 0);
    linereader.eachLine("./input/input.txt", (line, last) => {
        let amount = parseInt(line.substring(1));
        switch(line.charAt(0)) {
            case "N": {
                waypoint.add(new Victor(0, amount));
                break;
            }
            case "S": {
                waypoint.add(new Victor(0, -amount));
                break;
            }
            case "E": {
                waypoint.add(new Victor(amount, 0));
                break;
            }
            case "W": {
                waypoint.add(new Victor(-amount, 0));
                break;
            }
            case "L": {
                waypoint.rotateDeg(amount);
                break;
            }
            case "R": {
                waypoint.rotateDeg(-amount);
                break;
            }
            case "F": {
                let move = waypoint.clone().multiplyScalar(amount);
                position.add(move);
                break;
            }
        }

        if (last) {
            console.log("Result: " + Math.round(position.x - position.y));
        }
    });
}

if (require.main === module) {
    main();
}

