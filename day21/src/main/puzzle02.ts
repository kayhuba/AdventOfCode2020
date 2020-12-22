console.log("Day 21, Puzzle 02!")

import linereader from "line-reader";

class Ingredient {
    name: string;
    allergen: string | undefined;

    constructor(name: string) {
        this.name = name;
    }

    clone(): Ingredient {
        const ingredient = new Ingredient(this.name);
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
            // isolate those allergens which have only one matching ingredient already - remove those ingredients from
            // allergens who have multiple candidates still until everything is clear

            const clone: AllergenToIngredientMap = {};
            Object.keys(allergenToIngredientMap).forEach(allergen => {
                clone[allergen] = [...allergenToIngredientMap[allergen]];
            });

            const ingredientsWithAllergens: Ingredient[] = [];
            let keys = Object.keys(clone);
            do {
                keys.forEach(allergen => {
                    if (clone[allergen].length === 1) {
                        clone[allergen][0].allergen = allergen;
                        ingredientsWithAllergens.push(clone[allergen][0]);
                        delete clone[allergen];
                    } else {
                        for (let i=clone[allergen].length - 1; i >= 0; i--) {
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
            for (let i=0; i < ingredientsWithAllergens.length; i++) {
                if (i>0) {
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

