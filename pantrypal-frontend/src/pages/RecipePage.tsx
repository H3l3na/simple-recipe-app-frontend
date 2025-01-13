import React from 'react';
import '../styles/component.css';
import RecipeList from '../components/recipe/RecipeList';

const RecipePage: React.FC = () => {
  return (
    <main className="recipe-page">
      <h1 className="recipe-page-title">All Recipes</h1>
      <RecipeList difficultyFilter="" />
    </main>
  );
};

export default RecipePage;
