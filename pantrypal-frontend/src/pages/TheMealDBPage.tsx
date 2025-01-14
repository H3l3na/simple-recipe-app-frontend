import React, { useState } from 'react';
import '../styles/themealdb.css';
import { searchRecipes } from '../services/mealservice';
import { Recipe } from '../types';

const TheMealDBPage: React.FC = () => {
  const [recipeName, setRecipeName] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const result = await searchRecipes(recipeName);
      setRecipes(result.meals);
    } catch (err) {
      setError('Error fetching recipes. Please try again.');
    }
  };

  const getIngredients = (recipe: Recipe) => {
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
    <main className="recipe-page">
      <h1 className="recipe-page-title">The Meal DB</h1>
      <form onSubmit={handleSearch} className="recipe-search-form">
        <input
          type="text"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          placeholder="Enter a recipe name"
          className="recipe-search-input"
        />
        <button type="submit" className="recipe-search-button">
          Search
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <section className="recipe-results">
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <div key={index} className="recipe-card">
              <h2>{recipe.strMeal}</h2>
              <div className="ingredients-container">
                <h3 className="ingredients-title">Ingredients</h3>
                <ul className="ingredients-list">
                  {getIngredients(recipe).map((item, index) => (
                    <li key={index} className="ingredient-item">
                      <span className="ingredient-name">{item.ingredient}</span>
                      :
                      <span className="ingredient-measure">
                        {' '}
                        {item.measure}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="recipe-instructions">{recipe.strInstructions}</p>
            </div>
          ))
        ) : (
          <p>No recipes found. Try searching for something else!</p>
        )}
      </section>
    </main>
  );
};

export default TheMealDBPage;
