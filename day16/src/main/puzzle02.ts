console.log("Day 16, Puzzle 02!")

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

interface Ticket {
    fields: number[]
}

interface MatchingRule {
    [name: string]: Rule;
}

function main() {
    const rules: Rule[] = [];
    const myTicket: Ticket = {fields: []};
    const nearbyTickets: Ticket[] = [];
    const columnsRuleCandidates: Rule[][] = [];
    let parserState: ParserState = ParserState.Rules;
    linereader.eachLine("./input/input.txt", (line, last) => {
        const isValid = (number: number, rules: MinMax[]): boolean => {
            for (let i=0; i < rules.length; i++) {
                if (number >= rules[i].min && number <= rules[i].max) {
                    return true;
                }
            }

            return false;
        };

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
                const ticketFieldsRaw = line.split(",");
                const ticketFields: number[] = [];
                for (let i=0; i < ticketFieldsRaw.length; i++) {
                    ticketFields.push(parseInt(ticketFieldsRaw[i]));
                }
                myTicket.fields = ticketFields;
                break;
            }
            case ParserState.NearbyTickets: {
                const ticketFieldsRaw = line.split(",");
                const ticketFieldsValidated: number[] = [];
                for (let j=0; j < ticketFieldsRaw.length; j++) {
                    let i;
                    for (i=0; i < rules.length; i++) {
                        if (isValid(parseInt(ticketFieldsRaw[j]), rules[i].patterns)) {
                            break;
                        }
                    }

                    if (i === rules.length) {
                        return;
                    }

                    ticketFieldsValidated.push(parseInt(ticketFieldsRaw[j]));
                }

                nearbyTickets.push({
                    fields: ticketFieldsValidated
                });
                break;
            }
        }

        if (last) {
            // fill in columns
            for (let i=0; i < myTicket.fields.length; i++) {
                columnsRuleCandidates.push([...rules]);
            }

            // Add seat evaluation logic here
            console.log("Evaluate matching rules per field for all nearby tickets");
            for (let i=0; i < columnsRuleCandidates.length; i++) {
                for (let j=0; j < nearbyTickets.length; j++) {
                    const candidates: Rule[] = [...columnsRuleCandidates[i]];
                    for (let k=candidates.length - 1; k >= 0; k--) {
                        if (!isValid(nearbyTickets[j].fields[i], candidates[k].patterns)) {
                            columnsRuleCandidates[i].splice(k, 1);
                        }
                    }
                }
            }

            // At this point some columns are clear and have only one rule left,
            // others may have multiple still. We need to remove the clear ones from the unclear ones
            // so they become clear as well (what a sentence...)
            console.log("Clear ambiguous columns with other columns where only one rule is left");
            const matchingRule: MatchingRule = {};
            while (Object.keys(matchingRule).length < rules.length) {
                for (let i=0; i < columnsRuleCandidates.length; i++) {
                    const columnRulesLeft = columnsRuleCandidates[i];
                    if (columnRulesLeft.length === 1) {
                        matchingRule[columnRulesLeft[0].name] = columnRulesLeft[0];
                    } else {
                        const candidates: Rule[] = [...columnRulesLeft];
                        for (let k=candidates.length - 1; k >= 0; k--) {
                            if (matchingRule[candidates[k].name]) {
                                columnRulesLeft.splice(k, 1);
                            }
                        }
                    }
                }
            }

            let result = 1;
            for (let i=0; i < columnsRuleCandidates.length; i++) {
                if (columnsRuleCandidates[i][0].name.startsWith("departure")) {
                    result = result * myTicket.fields[i];
                }
            }

            console.log("Result: " + result);
        }
    });
}

if (require.main === module) {
    main();
}

