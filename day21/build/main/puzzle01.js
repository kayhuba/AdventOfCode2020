"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 21, Puzzle 01!");
const line_reader_1 = __importDefault(require("line-reader"));
class Ingredient {
    constructor(name) {
        this.possibleAllergens = [];
        this.name = name;
    }
    clone() {
        const ingredient = new Ingredient(this.name);
        ingredient.possibleAllergens = [...this.possibleAllergens];
        ingredient.allergen = this.allergen;
        return ingredient;
    }
}
class Food {
    constructor(ingredients, allergens) {
        this.ingredients = ingredients;
        this.allergens = allergens;
        this.ratio = allergens.length / ingredients.length;
    }
}
const foodPattern = /^(.+)\(contains ([^\)]+)\)$/;
function main() {
    const foodDefinitions = [];
    const nameToIngredientMap = {};
    const ingredientToFoodMap = {};
    const allergenToIngredientMap = {};
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
            const food = new Food(ingredientObjs, allergens);
            foodDefinitions.push(food);
            ingredients.forEach(ingredientName => {
                let ingredient = nameToIngredientMap[ingredientName];
                if (!ingredient) {
                    ingredient = new Ingredient(ingredientName);
                    nameToIngredientMap[ingredientName] = ingredient;
                }
                if (!ingredientToFoodMap[ingredientName]) {
                    ingredientToFoodMap[ingredientName] = [];
                }
                ingredientToFoodMap[ingredientName].push(food);
                ingredientObjs.push(ingredient);
            });
            allergens.forEach(allergen => {
                if (!allergenToIngredientMap[allergen]) {
                    allergenToIngredientMap[allergen] = [];
                    // all ingredients could contain the given allergen if it was previously unknown
                    allergenToIngredientMap[allergen] = [...food.ingredients];
                }
                else {
                    // strip out those ingredients that are not in the ingredients list this time
                    const newIngredients = [];
                    allergenToIngredientMap[allergen].forEach(ingredient => {
                        if (food.ingredients.includes(ingredient)) {
                            newIngredients.push(ingredient);
                        }
                    });
                    allergenToIngredientMap[allergen] = newIngredients;
                }
            });
        }
        if (last) {
            // find those ingredients, that are not in the allergenToIngredientMap
            const ingredientsMaybeWithAllergens = Object.values(allergenToIngredientMap);
            const ingredients = Object.values(nameToIngredientMap);
            const ingredientsWithNoAllergens = [];
            ingredients.forEach(ingredient => {
                let i;
                out: for (i = 0; i < ingredientsMaybeWithAllergens.length; i++) {
                    for (let j = 0; j < ingredientsMaybeWithAllergens[i].length; j++) {
                        if (ingredientsMaybeWithAllergens[i][j] === ingredient) {
                            break out;
                        }
                    }
                }
                if (i === ingredientsMaybeWithAllergens.length) {
                    ingredientsWithNoAllergens.push(ingredient);
                }
            });
            // count occurrences
            let occurrences = 0;
            ingredientsWithNoAllergens.forEach(ingredient => {
                occurrences += ingredientToFoodMap[ingredient.name].length;
            });
            console.log("Result: " + occurrences);
        }
    });
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=puzzle01.js.map