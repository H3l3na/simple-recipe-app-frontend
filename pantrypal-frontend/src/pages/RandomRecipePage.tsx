import { useState } from 'react';
import { getRandomRecipe } from '../services/mealservice';
import '../styles/component.css';

const RandomRecipe = () => {
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');

  const fetchRandomRecipe = async () => {
    try {
      const result = await getRandomRecipe();
      result && setRecipe(result?.meals[0]);
    } catch (err) {
      setError('Failed to fetch random recipe. Please try again.');
    }
  };

  return (
    <div className="random-recipe-container">
      <h1 className="random-recipe-title">Random Recipe Generator</h1>
      <button className="random-recipe-button" onClick={fetchRandomRecipe}>
        Get Random Recipe
      </button>
      {error && <p className="error-message">{error}</p>}
      {recipe && (
        <div className="recipe-card">
          <h2 className="recipe-title">{recipe.strMeal}</h2>
          <img
            className="recipe-image"
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
          />
          <p className="recipe-instructions">{recipe.strInstructions}</p>
        </div>
      )}
    </div>
  );
};

export default RandomRecipe;
