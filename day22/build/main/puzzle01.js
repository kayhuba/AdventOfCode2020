"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 22, Puzzle 01!");
const line_reader_1 = __importDefault(require("line-reader"));
function play(decks) {
    const playerOneCard = decks[0].splice(0, 1)[0];
    const playerTwoCard = decks[1].splice(0, 1)[0];
    if (playerOneCard > playerTwoCard) {
        // player 1 wins
        decks[0].push(playerOneCard);
        decks[0].push(playerTwoCard);
    }
    else {
        // player 2 wins
        decks[1].push(playerTwoCard);
        decks[1].push(playerOneCard);
    }
}
function main() {
    let player = 0;
    const decks = [];
    line_reader_1.default.eachLine("./input/input.txt", (line, last) => {
        if (line === "Player 1:") {
            decks[player] = [];
        }
        else if (line === "Player 2:") {
            player++;
            decks[player] = [];
        }
        else {
            if (line.length > 0) {
                decks[player].push(parseInt(line));
            }
        }
        if (last) {
            do {
                play(decks);
            } while (decks[0].length > 0 && decks[1].length > 0);
            const winnerDeck = decks[0].length > 0 ? decks[0] : decks[1];
            let score = 0;
            for (let i = 0; i < winnerDeck.length; i++) {
                score += (winnerDeck.length - i) * winnerDeck[i];
            }
            console.log("Result: " + score);
        }
    });
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=puzzle01.js.map