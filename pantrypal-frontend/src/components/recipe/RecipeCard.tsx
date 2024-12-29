import React from 'react';
import { Recipe } from '../../types';
import { useMutation } from 'react-query';
import { addToFavorites } from '../../services/recipeService';

interface Props {
  recipe: Recipe;
  showButton?: boolean;
}

const RecipeCard: React.FC<Props> = ({ recipe, showButton = true }) => {

    const { mutate } = useMutation(
        (recipeId: number) => addToFavorites(1, recipeId), // Call the service method
        {
            onSuccess: () => {
                console.log('Recipe added to favorites!');
                // Handle any side effects after success (e.g., show a success message)
            },
            onError: (error) => {
                console.error('Error adding to favorites', error);
                // Handle the error here (e.g., show an error message)
            },
        }
    );

    const handleAddToFavorites = () => {
        mutate(recipe.recipeId); // Call the mutate function with recipeId
      };

    return (
      <article>
        <h2>{recipe.recipeName}</h2>
        <p>{'Prep time: ' + recipe.cookingTime + ' min'}</p>
        <p>{'Difficulty level: ' + recipe.difficultyLevel}</p>
        {showButton && <button onClick={handleAddToFavorites}>Favorite</button> }
      </article>
    );
  };

export default RecipeCard;
