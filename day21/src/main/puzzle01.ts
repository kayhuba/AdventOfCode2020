import has = Reflect.has;

console.log("Day 21, Puzzle 01!")

import linereader from "line-reader";

class Ingredient {
    name: string;
    possibleAllergens: string[] = [];

    constructor(name: string, possibleAllergens: string[]) {
        this.name = name;
        this.possibleAllergens = possibleAllergens;
    }

    possiblyContainsAllergen(allergen: string) {
        for (let i=0; i < this.possibleAllergens.length; i++) {
            if (this.possibleAllergens[i] === allergen) {
                return true;
            }
        }

        return false;
    }

    clone(): Ingredient {
        let clone =  new Ingredient(this.name, [...this.possibleAllergens]);
        return clone;
    }
}

class Food {
    ingredients: Ingredient[];
    allergens: string[];
    ratio: number;

    constructor(ingredients: Ingredient[], allergens: string[]) {
        this.ingredients = ingredients;
        this.allergens = allergens;
        this.ratio = allergens.length / ingredients.length;
    }
}

interface IngredientMap {
    [ingredientName: string]: Ingredient;
}

function checkFoodConstraints(food: Food): boolean {
    for (let i=0; i < food.allergens.length; i++) {
        let j;
        for (j=0; j < food.ingredients.length; j++) {
            const ingredient: Ingredient = food.ingredients[j];
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

const foodPattern: RegExp = /^(.+)\(contains ([^\)]+)\)$/;
function main() {

    const foodDefinitions: Food[] = [];
    const ingredientMap: IngredientMap = {};
    linereader.eachLine("./input/input.txt", (line, last) => {
        if (line.length > 0) {
            const match = line.match(foodPattern);
            if (!match) {
                throw new Error("Unexpected");
            }

            const ingredientsUnparsed = match[1];
            const allergensUnparsed = match[2];
            const ingredients: string[] = ingredientsUnparsed.trim().split(" ");
            const allergens: string[] = allergensUnparsed.trim().split(", ");

            const ingredientObjs: Ingredient[] = [];
            let ingredient: Ingredient;
            for (let i=0; i < ingredients.length; i++) {
                ingredient = ingredientMap[ingredients[i]];

                if (ingredient === undefined) {
                    ingredient = new Ingredient(ingredients[i], [...allergens]);
                    ingredientMap[ingredients[i]] = ingredient;
                } else {
                    for (let j=0; j < allergens.length; j++) {
                        let k;
                        for (k=0; k < ingredient.possibleAllergens.length; k++) {
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
                let ingredient: Ingredient;
                do {
                    ingredient = sortedIngredients[offset++];
                } while (offset < sortedIngredients.length && ingredient.possibleAllergens.length < 2);

                const requiredAllergens: string[] = [];
                const allergenLength = ingredient.possibleAllergens.length;
                for (let allergenCount=0; allergenCount < allergenLength; allergenCount++) {
                    let allergenRemoved: string = ingredient.possibleAllergens.pop() as string;
                    let i;
                    for (i=0; i < foodDefinitions.length; i++) {
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

