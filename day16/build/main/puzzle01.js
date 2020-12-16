"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 15, Puzzle 01!");
const line_reader_1 = __importDefault(require("line-reader"));
var ParserState;
(function (ParserState) {
    ParserState[ParserState["Rules"] = 0] = "Rules";
    ParserState[ParserState["MyTicket"] = 1] = "MyTicket";
    ParserState[ParserState["NearbyTickets"] = 2] = "NearbyTickets";
    ParserState[ParserState["Done"] = 3] = "Done";
})(ParserState || (ParserState = {}));
function main() {
    const rules = [];
    const myTicket = [];
    const nearbyTickets = [];
    let ticketScanningErrorRate = 0;
    let parserState = ParserState.Rules;
    line_reader_1.default.eachLine("./input/input.txt", (line, last) => {
        if (line.length === 0 && !last) {
            return;
        }
        if (line === "your ticket:") {
            parserState = ParserState.MyTicket;
            return;
        }
        if (line === "nearby tickets:") {
            parserState = ParserState.NearbyTickets;
            return;
        }
        const isValid = (field, rules) => {
            for (let i = 0; i < rules.length; i++) {
                if (field >= rules[i].min && field <= rules[i].max) {
                    return true;
                }
            }
            return false;
        };
        switch (parserState) {
            case ParserState.Rules: {
                const keyValue = line.split(": ");
                const rulesRaw = keyValue[1].split(" or ");
                const minMax = [];
                rulesRaw.forEach(rule => {
                    const minMaxRaw = rule.split("-");
                    minMax.push({
                        min: parseInt(minMaxRaw[0]),
                        max: parseInt(minMaxRaw[1])
                    });
                });
                rules.push({
                    name: keyValue[0],
                    patterns: minMax
                });
                break;
            }
            case ParserState.MyTicket: {
                break;
            }
            case ParserState.NearbyTickets: {
                const ticketFieldsRaw = line.split(",");
                ticketFieldsRaw.forEach(ticketField => {
                    for (let i = 0; i < rules.length; i++) {
                        if (isValid(parseInt(ticketField), rules[i].patterns)) {
                            return;
                        }
                    }
                    ticketScanningErrorRate += parseInt(ticketField);
                });
                break;
            }
        }
        if (last) {
            console.log("Result: " + ticketScanningErrorRate);
        }
    });
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=puzzle01.js.map