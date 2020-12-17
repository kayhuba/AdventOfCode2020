console.log("Day 16, Puzzle 01!")

import linereader from "line-reader";

enum ParserState {
    Rules,
    MyTicket,
    NearbyTickets,
    Done
}

interface MinMax {
    min: number;
    max: number;
}

interface Rule {
    name: string;
    patterns: MinMax[];
}

function main() {
    const rules: Rule[] = [];
    const myTicket: number[] = [];
    const nearbyTickets: number[] = []
    let ticketScanningErrorRate: number = 0;
    let parserState: ParserState = ParserState.Rules;
    linereader.eachLine("./input/input.txt", (line, last) => {
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

        const isValid = (field: number, rules: MinMax[]): boolean => {
            for (let i=0; i < rules.length; i++) {
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
                const minMax: MinMax[] = [];
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
                    for (let i=0; i < rules.length; i++) {
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

