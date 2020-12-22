"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 22, Puzzle 02!");
const line_reader_1 = __importDefault(require("line-reader"));
function cloneDecks(decks, limitOne, limitTwo) {
    const clone = [];
    clone[0] = [];
    for (let i = 0; i < Math.min(decks[0].length, limitOne); i++) {
        clone[0].push(decks[0][i]);
    }
    clone[1] = [];
    for (let i = 0; i < Math.min(decks[1].length, limitTwo); i++) {
        clone[1].push(decks[1][i]);
    }
    return clone;
}
function isSameDeck(deck, referenceDeck) {
    if (deck.length !== referenceDeck.length) {
        return false;
    }
    for (let i = 0; i < deck.length; i++) {
        if (deck[i] !== referenceDeck[i]) {
            return false;
        }
    }
    return true;
}
function play(decks) {
    let deckStack = undefined;
    let lastWinner;
    do {
        if (deckStack === undefined) {
            deckStack = [cloneDecks(decks, Number.MAX_VALUE, Number.MAX_VALUE)];
        }
        else {
            for (let i = 0; i < deckStack.length; i++) {
                if (isSameDeck(decks[0], deckStack[i][0]) || isSameDeck(decks[1], deckStack[i][1])) {
                    return 0;
                }
            }
            deckStack.push(cloneDecks(decks, Number.MAX_VALUE, Number.MAX_VALUE));
        }
        lastWinner = playRound(decks);
    } while (decks[0].length > 0 && decks[1].length > 0);
    return lastWinner;
}
function playRound(decks) {
    const playerOneCard = decks[0].splice(0, 1)[0];
    const playerTwoCard = decks[1].splice(0, 1)[0];
    let winner = -1;
    if (decks[0].length >= playerOneCard && decks[1].length >= playerTwoCard) {
        // sub-game
        const cloneDeck = cloneDecks(decks, playerOneCard, playerTwoCard);
        winner = play(cloneDeck);
    }
    else {
        winner = (playerOneCard > playerTwoCard) ? 0 : 1;
    }
    if (winner === 0) {
        // player 1 wins
        decks[0].push(playerOneCard);
        decks[0].push(playerTwoCard);
        winner = 0;
    }
    else {
        // player 2 wins
        decks[1].push(playerTwoCard);
        decks[1].push(playerOneCard);
        winner = 1;
    }
    return winner;
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
            let lastWinner;
            lastWinner = play(decks);
            const winnerDeck = decks[lastWinner];
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
//# sourceMappingURL=puzzle02.js.map