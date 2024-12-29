import React, { useState } from 'react';
import { Recipe } from '../../types';
import { createRecipe } from '../../services/recipeService';

const RecipeForm: React.FC = () => {
  const [newRecipeData, setNewRecipeData] = useState<Recipe>({
    recipeName: '',
    cookingTime: '0',
    difficultyLevel: ''
  });

  const handleCreateRecipe = async () => {
    try {
      const createdRecipe = await createRecipe(newRecipeData);
      console.log('Recipe created:', createdRecipe);
    } catch (error) {
      console.error('Error creating recipe:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRecipeData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


   return (
        <div className="create-recipe-form">
          <h2>Create a New Recipe</h2>
          <form>
            <input
              type="text"
              name="recipeName"
              placeholder="Recipe Name"
              value={newRecipeData.recipeName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="difficultyLevel"
              placeholder="Difficulty Level"
              value={newRecipeData.difficultyLevel}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="cookingTime"
              placeholder="Cooking Time (min)"
              value={newRecipeData.cookingTime}
              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={handleCreateRecipe}
              className="new-recipe-button"
            >
              Submit Recipe
            </button>
          </form>
        </div>
      )
};

export default RecipeForm;
