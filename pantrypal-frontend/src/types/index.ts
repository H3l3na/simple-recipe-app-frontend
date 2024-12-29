export interface Ingredient {
    ingredientId?: number;
    name: string;
    quantity: string;
  }

export interface Recipe {
    recipeId?: number;
    recipeName: string;
    cookingTime: string;
    difficultyLevel: string;
    preparationSteps: string;
    ingredients: Ingredient[];
  }
