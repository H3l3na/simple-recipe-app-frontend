import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Snackbar, Alert } from '@mui/material';
import { fetchAllRecipes, fetchMyRecipes } from '../../services/recipeService';
import RecipeCard from './RecipeCard';
import { Recipe } from '../../types';

interface RecipeListProps {
  nameFilter: string;
  difficultyFilter: string;
  cookingTimeFilter: number | undefined;
  cuisineFilter: string;
}

const RecipeList: React.FC<RecipeListProps> = ({
  nameFilter,
  difficultyFilter,
  cookingTimeFilter,
  cuisineFilter,
}) => {
  const {
    data: recipes,
    isLoading,
    error,
  } = useQuery<Recipe[]>(['recipes'], fetchAllRecipes);
  const {
    data: favoriteRecipes = [],
    isLoading: isFavoritesLoading,
    error: favoritesError,
  } = useQuery<Recipe[]>(['favoriteRecipes', 1], () => fetchMyRecipes(1));
  const [localFavorites, setLocalFavorites] = useState<Recipe[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    if (favoriteRecipes.length > 0) {
      setLocalFavorites(favoriteRecipes);
    }
  }, [favoriteRecipes]);

  const handleRecipeDeletion = (recipeId: number) => {
    setSnackbarMessage('Recipe deleted successfully!');
    setOpenSnackbar(true);
  };

  const handleToggleFavorite = (recipeId: number) => {
    setLocalFavorites(
      (prev) =>
        prev.some((fav) => fav.recipeId === recipeId)
          ? prev.filter((fav) => fav.recipeId !== recipeId) // Remove from favorites
          : [...prev, recipes?.find((recipe) => recipe.recipeId === recipeId)!] // Add to favorites
    );
  };

  const filteredRecipes = recipes?.filter((recipe) => {
    const matchesName = nameFilter
      ? recipe.recipeName.toLowerCase().includes(nameFilter.toLowerCase())
      : true;

    const matchesDifficulty = difficultyFilter
      ? recipe.difficultyLevel.toLowerCase() === difficultyFilter.toLowerCase()
      : true;

    const matchesCookingTime =
      cookingTimeFilter !== undefined
        ? recipe.cookingTime <= cookingTimeFilter
        : true;

    const matchesCuisine = cuisineFilter
      ? recipe.cuisineType?.toLowerCase().includes(cuisineFilter.toLowerCase())
      : true;

    return (
      matchesName && matchesDifficulty && matchesCookingTime && matchesCuisine
    );
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading recipes</p>;

  return (
    <section>
      {filteredRecipes && filteredRecipes.length > 0 ? (
        filteredRecipes.map((recipe: Recipe) => {
          const isFavorite =
            Array.isArray(localFavorites) &&
            localFavorites.some(
              (favRecipe) => favRecipe.recipeId === recipe.recipeId
            );
          return (
            <RecipeCard
              key={recipe.recipeId}
              recipe={recipe}
              favoriteRecipe={isFavorite}
              onToggleFavorite={handleToggleFavorite}
              onDelete={handleRecipeDeletion}
            />
          );
        })
      ) : (
        <p>No recipes match your filters.</p>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </section>
  );
};

export default RecipeList;
