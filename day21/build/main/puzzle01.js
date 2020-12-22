"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 21, Puzzle 01!");
const line_reader_1 = __importDefault(require("line-reader"));
class Ingredient {
    constructor(name, possibleAllergens) {
        this.possibleAllergens = [];
        this.name = name;
        this.possibleAllergens = possibleAllergens;
    }
    possiblyContainsAllergen(allergen) {
        for (let i = 0; i < this.possibleAllergens.length; i++) {
            if (this.possibleAllergens[i] === allergen) {
                return true;
            }
        }
        return false;
    }
    clone() {
        let clone = new Ingredient(this.name, [...this.possibleAllergens]);
        return clone;
    }
}
class Food {
    constructor(ingredients, allergens) {
        this.ingredients = ingredients;
        this.allergens = allergens;
        this.ratio = allergens.length / ingredients.length;
    }
}
function checkFoodConstraints(food) {
    for (let i = 0; i < food.allergens.length; i++) {
        let j;
        for (j = 0; j < food.ingredients.length; j++) {
            const ingredient = food.ingredients[j];
            if (ingredient.possiblyContainsAllergen(food.allergens[i])) {
                break;
            }
        }
        if (j === food.ingredients.length) {
            return false;
        }
    }
    return true;
}
const foodPattern = /^(.+)\(contains ([^\)]+)\)$/;
function main() {
    const foodDefinitions = [];
    const ingredientMap = {};
    line_reader_1.default.eachLine("./input/input.txt", (line, last) => {
        if (line.length > 0) {
            const match = line.match(foodPattern);
            if (!match) {
                throw new Error("Unexpected");
            }
            const ingredientsUnparsed = match[1];
            const allergensUnparsed = match[2];
            const ingredients = ingredientsUnparsed.trim().split(" ");
            const allergens = allergensUnparsed.trim().split(", ");
            const ingredientObjs = [];
            let ingredient;
            for (let i = 0; i < ingredients.length; i++) {
                ingredient = ingredientMap[ingredients[i]];
                if (ingredient === undefined) {
                    ingredient = new Ingredient(ingredients[i], [...allergens]);
                    ingredientMap[ingredients[i]] = ingredient;
                }
                else {
                    for (let j = 0; j < allergens.length; j++) {
                        let k;
                        for (k = 0; k < ingredient.possibleAllergens.length; k++) {
                            if (allergens[j] === ingredient.possibleAllergens[k]) {
                                break;
                            }
                        }
                        if (k === ingredient.possibleAllergens.length) {
                            ingredient.possibleAllergens.push(allergens[j]);
                        }
                    }
                }
                ingredientObjs.push(ingredient);
            }
            foodDefinitions.push(new Food(ingredientObjs, allergens));
        }
        if (last) {
            foodDefinitions.sort((a, b) => b.ratio - a.ratio);
            let sortedIngredients = Object.values(ingredientMap);
            sortedIngredients.sort((a, b) => a.possibleAllergens.length - b.possibleAllergens.length);
            for (let offset = 0; offset < sortedIngredients.length;) {
                let ingredient;
                do {
                    ingredient = sortedIngredients[offset++];
                } while (offset < sortedIngredients.length && ingredient.possibleAllergens.length < 2);
                const requiredAllergens = [];
                const allergenLength = ingredient.possibleAllergens.length;
                for (let allergenCount = 0; allergenCount < allergenLength; allergenCount++) {
                    let allergenRemoved = ingredient.possibleAllergens.pop();
                    let i;
                    for (i = 0; i < foodDefinitions.length; i++) {
                        if (!checkFoodConstraints(foodDefinitions[i])) {
                            break;
                        }
                    }
                    if (i < foodDefinitions.length) {
                        requiredAllergens.push(allergenRemoved);
                        ingredient.possibleAllergens.splice(0, 0, allergenRemoved);
                    }
                }
                ingredient.possibleAllergens = requiredAllergens;
            }
            console.log(checkFoodConstraints(foodDefinitions[0]));
            console.log("Result: ");
        }
    });
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=puzzle01.js.map