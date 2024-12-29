import React from 'react';
import { Recipe } from '../../types';

interface Props {
  recipe: Recipe;
}

const RecipeCard: React.FC<Props> = ({ recipe }) => (
  <article>
    <h2>{recipe.name}</h2>
    <p>{recipe.description}</p>
    <button>Favorite</button>
  </article>
);

export default RecipeCard;
