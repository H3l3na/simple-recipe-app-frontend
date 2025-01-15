export interface Ingredient {
  ingredientId?: number;
  name: string;
  quantity: string;
}

export interface Recipe {
  recipeId: number;
  recipeName: string;
  cookingTime: number;
  cuisineType: string;
  difficultyLevel: string;
  preparationSteps: string;
  ingredients: Ingredient[];
  averageRating: number;
  numberOfRatings: number;
}
