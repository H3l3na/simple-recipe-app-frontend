import React from 'react';
import { useQuery } from 'react-query';
import { fetchMyRecipes } from '../../services/recipeService';
import RecipeCard from './RecipeCard';
import { Recipe } from '../../types';

const RecipeList: React.FC = () => {
    const { data: recipes, isLoading, error } = useQuery<Recipe[]>(
        ['recipes', 1], 
        () => fetchMyRecipes(1) // hard coded userid temporarily
      );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading recipes</p>;

  return (
    <section>
      {recipes?.map((recipe: Recipe) => (
        <RecipeCard key={recipe.recipeId} recipe={recipe} showButton={false} />
      ))}
    </section>
  );
};

export default RecipeList;
