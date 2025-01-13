import React from 'react';
import { useQuery } from 'react-query';
import { fetchAllRecipes } from '../../services/recipeService';
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
  const { data: recipes, isLoading, error } = useQuery<Recipe[]>(['recipes'], fetchAllRecipes);

  const filteredRecipes = recipes?.filter((recipe) => {
    const matchesName = nameFilter
      ? recipe.recipeName.toLowerCase().includes(nameFilter.toLowerCase())
      : true;

    const matchesDifficulty = difficultyFilter
      ? recipe.difficultyLevel.toLowerCase() === difficultyFilter.toLowerCase()
      : true;

    const matchesCookingTime = cookingTimeFilter !== undefined
      ? recipe.cookingTime <= cookingTimeFilter
      : true;

    const matchesCuisine = cuisineFilter
      ? recipe.cuisineType?.toLowerCase().includes(cuisineFilter.toLowerCase())
      : true;

    return matchesName && matchesDifficulty && matchesCookingTime && matchesCuisine;
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading recipes</p>;

  return (
    <section>
      {filteredRecipes && filteredRecipes.length > 0 ? (
        filteredRecipes.map((recipe: Recipe) => (
          <RecipeCard key={recipe.recipeId} recipe={recipe} />
        ))
      ) : (
        <p>No recipes match your filters.</p>
      )}
    </section>
  );
};

export default RecipeList;
