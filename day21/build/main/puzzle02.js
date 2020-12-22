"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 21, Puzzle 02!");
const line_reader_1 = __importDefault(require("line-reader"));
class Ingredient {
    constructor(name) {
        this.name = name;
    }
    clone() {
        const ingredient = new Ingredient(this.name);
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
            // isolate those allergens which have only one matching ingredient already - remove those ingredients from
            // allergens who have multiple candidates still until everything is clear
            const clone = {};
            Object.keys(allergenToIngredientMap).forEach(allergen => {
                clone[allergen] = [...allergenToIngredientMap[allergen]];
            });
            const ingredientsWithAllergens = [];
            let keys = Object.keys(clone);
            do {
                keys.forEach(allergen => {
                    if (clone[allergen].length === 1) {
                        clone[allergen][0].allergen = allergen;
                        ingredientsWithAllergens.push(clone[allergen][0]);
                        delete clone[allergen];
                    }
                    else {
                        for (let i = clone[allergen].length - 1; i >= 0; i--) {
                            if (clone[allergen][i].allergen !== undefined) {
                                clone[allergen].splice(i, 1);
                            }
                        }
                    }
                });
                keys = Object.keys(clone);
            } while (keys.length > 0);
            // @ts-ignore
            ingredientsWithAllergens.sort((a, b) => (a.allergen < b.allergen ? -1 : (a.allergen === b.allergen ? 0 : 1)));
            let result = "";
            for (let i = 0; i < ingredientsWithAllergens.length; i++) {
                if (i > 0) {
                    result += ",";
                }
                result += ingredientsWithAllergens[i].name;
            }
            console.log("Result: " + result);
        }
    });
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=puzzle02.js.map