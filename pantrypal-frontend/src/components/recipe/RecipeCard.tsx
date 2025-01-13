import React from 'react';
import { Recipe } from '../../types';
import { useMutation } from 'react-query';
import { toggleFavorite, deleteRecipe } from '../../services/recipeService';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Props {
  recipe: Recipe;
  favoriteRecipe: boolean;
  showButton?: boolean;
  onToggleFavorite: (recipeId: number) => void; 
}

const RecipeCard: React.FC<Props> = ({
  recipe,
  showButton = true,
  favoriteRecipe = false,
  onToggleFavorite,
}) => {
  const navigate = useNavigate();

  const { mutate } = useMutation(
    (recipeId: number) => toggleFavorite(1, recipeId), //hard coded user id
    {
      onSuccess: () => {
        console.log('Favorite status toggled!');
        onToggleFavorite(recipe.recipeId); 
      },
      onError: (error) => {
        console.error('Error toggling favorite', error);
      },
    }
  );

  const handleToggleFavorite = () => {
    recipe?.recipeId && mutate(recipe.recipeId);
  };

  const handleViewDetails = () => {
    navigate(`/recipe/${recipe.recipeId}`);
  };

  return (
    <article>
      <div className="recipe-title-container">
        <h2>{recipe?.recipeName}</h2>
        {showButton && (
          <IconButton
            onClick={handleToggleFavorite}
            aria-label="favorite"
            sx={{
              color: favoriteRecipe ? 'red' : 'primary',
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
      <p>{'Prep time: ' + recipe?.cookingTime + ' min'}</p>
      <p>{'Difficulty level: ' + recipe?.difficultyLevel}</p>
      <div>
        <button onClick={handleViewDetails}>View Details</button>
      </div>
    </article>
  );
};

export default RecipeCard;
