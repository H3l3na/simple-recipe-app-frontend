import React, { useState } from 'react';
import { Recipe } from '../../types';
import { createRecipe } from '../../services/recipeService';
import '../../styles/recipeform.css'; // Importing the CSS file

const RecipeForm: React.FC = () => {
  const [newRecipeData, setNewRecipeData] = useState<Recipe>({
    recipeName: '',
    cookingTime: '0',
    difficultyLevel: '',
    preparationSteps: '',
    ingredients: []
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
        <div className="form-group">
          <label htmlFor="recipeName">Recipe Name</label>
          <input
            id="recipeName"
            type="text"
            name="recipeName"
            placeholder="Enter recipe name"
            value={newRecipeData.recipeName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="difficultyLevel">Difficulty Level</label>
          <input
            id="difficultyLevel"
            type="text"
            name="difficultyLevel"
            placeholder="Enter difficulty level"
            value={newRecipeData.difficultyLevel}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cookingTime">Cooking Time (min)</label>
          <input
            id="cookingTime"
            type="number"
            name="cookingTime"
            placeholder="Enter cooking time in minutes"
            value={newRecipeData.cookingTime}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="button"
          onClick={handleCreateRecipe}
          className="new-recipe-button"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;
