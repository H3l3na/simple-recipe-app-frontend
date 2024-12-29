import React from 'react';
import { useQuery } from 'react-query';
import { fetchAllRecipes } from '../../services/recipeService';
import RecipeCard from './RecipeCard';
import { Recipe } from '../../types';

const RecipeList: React.FC = () => {
    const { data: recipes, isLoading, error } = useQuery<Recipe[]>(['recipes'], fetchAllRecipes);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading recipes</p>;

  return (
    <section>
      {recipes?.map((recipe: Recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </section>
  );
};

export default RecipeList;
