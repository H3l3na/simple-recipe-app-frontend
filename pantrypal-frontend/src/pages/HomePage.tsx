import React from 'react';
import '../styles/component.css';
import RecipeList from '../components/recipe/RecipeList';

const HomePage: React.FC = () => (
  <main>
    <h1>Welcome to Pantry Pal</h1>
    <RecipeList />
  </main>
);

export default HomePage;
