export interface Ingredient {
  ingredientId?: number;
  name: string;
  quantity: string;
  numberOfCalories: number;
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
  numberOfServings: number;
  caloriesPerServing: number;
}
