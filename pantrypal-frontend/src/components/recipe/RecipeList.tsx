import React from 'react';
import { useQuery } from 'react-query';
import { fetchAllRecipes } from '../../services/recipeService';
import RecipeCard from './RecipeCard';
import { Recipe } from '../../types';

interface RecipeListProps {
    difficultyFilter: string;
  }

  const RecipeList: React.FC<RecipeListProps> = ({ difficultyFilter }) => {
  const { data: recipes, isLoading, error } = useQuery<Recipe[]>(['recipes'], fetchAllRecipes);

  const filteredRecipes = difficultyFilter
  ? recipes?.filter((recipe) => 
      recipe.difficultyLevel.toLowerCase() === difficultyFilter.toLowerCase()
    )
  : recipes;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading recipes</p>;

  return (
    <section>
      {filteredRecipes?.map((recipe: Recipe) => (
        <RecipeCard key={recipe.recipeId} recipe={recipe} />
      ))}
    </section>
  );
};

export default RecipeList;
