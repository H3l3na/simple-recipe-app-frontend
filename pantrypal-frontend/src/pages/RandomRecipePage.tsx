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

  const getIngredients = () => {
    if (!recipe) return [];
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      /* restrict ingredient size to max 20 */
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (
        ingredient &&
        ingredient.trim() !== '' &&
        measure &&
        measure.trim() !== ''
      ) {
        ingredients.push({ ingredient, measure });
      }
    }
    return ingredients;
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
          <div className="ingredients-container">
            <h3 className="ingredients-title">Ingredients</h3>
            <ul className="ingredients-list">
              {getIngredients().map((item, index) => (
                <li key={index} className="ingredient-item">
                  <span className="ingredient-name">{item.ingredient}</span>:
                  <span className="ingredient-measure"> {item.measure}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="recipe-instructions">{recipe.strInstructions}</p>
        </div>
      )}
    </div>
  );
};

export default RandomRecipe;
