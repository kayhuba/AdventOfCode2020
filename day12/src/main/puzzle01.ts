import Victor from "victor";

console.log("Day 12, Puzzle 01!")

import linereader from "line-reader";

function main() {
    let direction = new Victor(1, 0);
    let position = new Victor(0, 0);
    linereader.eachLine("./input/input.txt", (line, last) => {
        let amount = parseInt(line.substring(1));
        switch(line.charAt(0)) {
            case "N": {
                position.add(new Victor(0, amount));
                break;
            }
            case "S": {
                position.add(new Victor(0, -amount));
                break;
            }
            case "E": {
                position.add(new Victor(amount, 0));
                break;
            }
            case "W": {
                position.add(new Victor(-amount, 0));
                break;
            }
            case "L": {
                direction.rotateDeg(amount);
                break;
            }
            case "R": {
                direction.rotateDeg(-amount);
                break;
            }
            case "F": {
                let move = direction.clone().multiplyScalar(amount);
                position.add(move);
                break;
            }
        }

        if (last) {
            console.log("Result: " + Math.floor(position.x - position.y));
        }
    });
}

if (require.main === module) {
    main();
}

