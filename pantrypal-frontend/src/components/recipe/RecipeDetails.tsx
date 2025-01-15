import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getRecipeById } from '../../services/recipeService';
import { Recipe } from '../../types';
import '../../styles/recipedetails.css'; // Add the CSS import
import { RecipeStarRating } from '../rating/RecipeStarRating';

interface RecipeDetailsProps {}

const RecipeDetails: React.FC<RecipeDetailsProps> = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!recipeId) {
      navigate('/');
      return;
    }

    const fetchRecipe = async () => {
      try {
        if (recipeId) {
          const fetchedRecipe = await getRecipeById(parseInt(recipeId));
          setRecipe(fetchedRecipe);
        }
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };
    fetchRecipe();
  }, [recipeId]);

  if (!recipe) return <p>Loading...</p>;

  const handleRatingUpdate = (newAverage: number, newTotal: number) => {
    setRecipe((prevRecipe) =>
      prevRecipe
        ? {
            ...prevRecipe,
            averageRating: newAverage,
            numberOfRatings: newTotal,
          }
        : null
    );
  };

  return (
    <div className="recipe-details-container">
      <h1 className="recipe-title">{recipe.recipeName}</h1>
      <RecipeStarRating
        recipeId={recipe.recipeId}
        currentRating={recipe.averageRating}
        numberOfRatings={recipe.numberOfRatings}
        onRatingUpdate={handleRatingUpdate}
        className={'rating-container'}
      />
      <div className="recipe-header">
        <p className="recipe-time">Prep time: {recipe.cookingTime} min</p>
        <p className="recipe-cuisine">Cuisine type: {recipe.cuisineType}</p>
        <p className="recipe-difficulty">
          Difficulty level: {recipe.difficultyLevel}
        </p>
      </div>
      <div className="ingredients-section">
        <h2>Ingredients</h2>
        <ul className="ingredient-list">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="ingredient-item">
              <strong>{ingredient.name}:</strong> {ingredient.quantity}
            </li>
          ))}
        </ul>
      </div>
      <div className="instructions-section">
        <h2>Preparation Steps</h2>
        <p>{recipe.preparationSteps}</p>
      </div>
    </div>
  );
};

export default RecipeDetails;
