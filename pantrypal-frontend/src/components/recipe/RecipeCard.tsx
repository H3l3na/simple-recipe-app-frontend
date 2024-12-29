import React from 'react';
import { Recipe } from '../../types';
import { useMutation } from 'react-query';
import { addToFavorites, deleteRecipe } from '../../services/recipeService';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; 
import FavoriteIcon from '@mui/icons-material/Favorite'; 

interface Props {
  recipe: Recipe;
  showButton?: boolean;
}

const RecipeCard: React.FC<Props> = ({ recipe, showButton = true }) => {
    const navigate = useNavigate();

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

    const { mutate: deleteRecipeMutate } = useMutation(
        (recipeId: number) => deleteRecipe(recipeId), // Call the delete service method
        {
          onSuccess: () => {
            console.log('Recipe deleted!');
            // Optionally navigate or update the state after successful deletion
          },
          onError: (error) => {
            console.error('Error deleting recipe', error);
            // Handle the error here
          },
        }
      );

    const handleAddToFavorites = () => {
        recipe?.recipeId && mutate(recipe.recipeId); // Call the mutate function with recipeId
      };

    const handleViewDetails = () => {
        navigate(`/recipe/${recipe.recipeId}`); // Navigate to the recipe details page
      };

    const handleDeleteRecipe = () => {
        if (recipe?.recipeId) {
          deleteRecipeMutate(recipe.recipeId); // Call the mutate function to delete the recipe
        }
      };

    return (
      <article>
        <div className="recipe-title-container">
        <h2>{recipe.recipeName}</h2>
        {showButton && (
            <IconButton
            onClick={handleAddToFavorites}
            aria-label="favorite"
            color="primary"
            sx={{
              '&:hover': {
                color: 'red', 
                transform: 'scale(1.2)', 
                transition: 'all 0.3s ease', 
              },
              '&:active': {
                transform: 'scale(1.1)', 
              },
            }}
          >
            <FavoriteIcon />
          </IconButton>
          )}
        </div>
        <p>{'Prep time: ' + recipe.cookingTime + ' min'}</p>
        <p>{'Difficulty level: ' + recipe.difficultyLevel}</p>
        <div>
        <button onClick={handleViewDetails}>View Details</button>
        <IconButton onClick={handleDeleteRecipe} aria-label="delete" color="error">
          <DeleteIcon />
        </IconButton>
      </div>
      </article>
    );
  };

export default RecipeCard;
