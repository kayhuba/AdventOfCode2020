console.log("Day 04, Puzzle 02!")

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

        const n = validPassportFields.length;
        for (let i=0; i < n; i++) {
            if (validPassportFields[i] === key) {
                // @ts-ignore
                currentPassport[key] = value;
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

interface PassportValidation {
    "byr": Validator, // birth year
    "iyr": Validator, // issue year
    "eyr": Validator, // expiration year
    "hgt": Validator, // height
    "hcl": Validator, // hair color
    "ecl": Validator, // eye color
    "pid": Validator, // passport id
    "cid": Validator  // country id - OPTIONAL
}

interface Validator {
    pattern?: RegExp,
    validator?: (value: string) => boolean
}

const validPassportFields: Array<keyof Passport> = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"];
const passportFieldValidators: PassportValidation = {
    "byr": {
        // byr (Birth Year) - four digits; at least 1920 and at most 2002.
        pattern: /^\d{4}$/,
        validator: value => (parseInt(value) >= 1920 && parseInt(value) <= 2002)
    },
    "iyr": {
        // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
        pattern: /^\d{4}$/,
        validator: value => (parseInt(value) >= 2010 && parseInt(value) <= 2020)
    },
    "eyr": {
        // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
        pattern: /^\d{4}$/,
        validator: value => (parseInt(value) >= 2020 && parseInt(value) <= 2030)
    },
    "hgt": {
        // hgt (Height) - a number followed by either cm or in:
        //   If cm, the number must be at least 150 and at most 193.
        //   If in, the number must be at least 59 and at most 76.
        pattern: /^\d+(cm)|(in)$/,
        validator: value => {
            let height = parseInt(value as string);
            if (/^\d+cm$/.test(value as string)) {
                return height >= 150 && height <= 193;
            }

            if (/^\d+in$/.test(value as string)) {
                return height >= 59 && height <= 76;
            }

            return false;
        }
    },
    "hcl": {
        // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
        pattern: /^#[0-9a-f]{6}$/
    },
    "ecl": {
        // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
        pattern: /^(amb)|(blu)|(brn)|(gry)|(grn)|(hzl)|(oth)$/
    },
    "pid": {
        // pid (Passport ID) - a nine-digit number, including leading zeroes.
        pattern: /^\d{9}$/
    },
    "cid": {
        // cid (Country ID) - ignored, missing or not.
        pattern: /^.*$/
    }
};

function validate(validator: Validator, passportField: string): boolean {
    if (typeof validator.pattern !== "undefined") {
        if (!validator.pattern.test(passportField)) {
            return false;
        }
    }

    if (typeof validator.validator !== "undefined") {
        return validator.validator(passportField);
    }

    return true;
}

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
                for (let key in currentPassport) {
                    // @ts-ignore
                    validPassport = validPassport && validate(passportFieldValidators[key], currentPassport[key]);
                }
            }

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

