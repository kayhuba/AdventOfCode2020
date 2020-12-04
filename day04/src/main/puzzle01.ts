console.log("Day 04, Puzzle 01!")

import linereader from "line-reader";

export function readLine(line: string, currentPassport: Passport): boolean {
    if (line.length === 0) {
        return true;
    }

    const keyValuePairs: string[] = line.split(" ");

    keyValuePairs.forEach(pair => {
        const keyValue: string[] = pair.split(":");
        const key: string = keyValue[0];
        const value: string = keyValue[1];
        const numberValue: number = parseInt(keyValue[1]);

        const n = validPassportFields.length;
        for (let i=0; i < n; i++) {
            if (validPassportFields[i] === key) {
                if (!isNaN(numberValue)) {
                    // @ts-ignore
                    currentPassport[key] = numberValue;
                } else {
                    // @ts-ignore
                    currentPassport[key] = value;
                }
                break;
            }
        }
    });

    return false;
}

interface Passport {
    "byr"?: number, // birth year
    "iyr"?: number, // issue year
    "eyr"?: number, // expiration year
    "hgt"?: number, // height
    "hcl"?: string, // hair color
    "ecl"?: string, // eye color
    "pid"?: string, // passport id
    "cid"?: string  // country id - OPTIONAL
}

const validPassportFields: Array<keyof Passport> = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"];

function main() {
    let validPassports = 0;
    let currentPassport: Passport = {};
    let passports: Passport[] = [];
    linereader.eachLine("./input/input.txt", (line, last) => {
        let onPassportComplete = () => {
            let validPassport =
                (typeof currentPassport.byr !== "undefined") &&
                (typeof currentPassport.iyr !== "undefined") &&
                (typeof currentPassport.eyr !== "undefined") &&
                (typeof currentPassport.hgt !== "undefined") &&
                (typeof currentPassport.hcl !== "undefined") &&
                (typeof currentPassport.ecl !== "undefined") &&
                (typeof currentPassport.pid !== "undefined");

            if (validPassport) {
                validPassports++;
            }

            passports.push(currentPassport);
            currentPassport = {};
        };

        if (readLine(line, currentPassport)) {
            onPassportComplete();
        }

        if (last) {
            onPassportComplete();
            console.log("Result: " + validPassports);
        }
    });
}

if (require.main === module) {
    main();
}

