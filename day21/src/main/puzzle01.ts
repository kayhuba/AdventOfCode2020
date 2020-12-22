console.log("Day 21, Puzzle 01!")

import linereader from "line-reader";

class Ingredient {
    name: string;
    possibleAllergens: string[] = [];
    allergen: string | undefined;

    constructor(name: string) {
        this.name = name;
    }

    clone(): Ingredient {
        const ingredient = new Ingredient(this.name);
        ingredient.possibleAllergens = [...this.possibleAllergens];
        ingredient.allergen = this.allergen;
        return ingredient;
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

interface IngredientToFoodMap {
    [ingredientName: string]: Food[];
}

interface AllergenToIngredientMap {
    [allergen: string]: Ingredient[];
}

interface NameToIngredientMap {
    [ingredientName: string]: Ingredient;
}

const foodPattern: RegExp = /^(.+)\(contains ([^\)]+)\)$/;
function main() {

    const foodDefinitions: Food[] = [];
    const nameToIngredientMap: NameToIngredientMap = {};
    const ingredientToFoodMap: IngredientToFoodMap = {};
    const allergenToIngredientMap: AllergenToIngredientMap = {};
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
            const food: Food = new Food(ingredientObjs, allergens);
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
               } else {
                   // strip out those ingredients that are not in the ingredients list this time
                   const newIngredients: Ingredient[] = [];
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
            const ingredientsMaybeWithAllergens: Ingredient[][] = Object.values(allergenToIngredientMap);
            const ingredients: Ingredient[] = Object.values(nameToIngredientMap);
            const ingredientsWithNoAllergens: Ingredient[] = [];

            ingredients.forEach(ingredient => {
                let i;
                out:
                for (i=0; i < ingredientsMaybeWithAllergens.length; i++) {
                    for (let j=0; j < ingredientsMaybeWithAllergens[i].length; j++) {
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

