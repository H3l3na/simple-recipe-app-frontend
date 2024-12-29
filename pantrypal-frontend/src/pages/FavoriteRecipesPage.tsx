import React from 'react';
import '../styles/component.css'; 
import FavoriteRecipeList from '../components/recipe/FavoriteRecipeList';

const RecipePage: React.FC = () => {
  return (
    <main className="recipe-page">
      <h1 className="recipe-page-title">Favorite Recipes</h1>
      <FavoriteRecipeList />
    </main>
  );
};

export default RecipePage;
