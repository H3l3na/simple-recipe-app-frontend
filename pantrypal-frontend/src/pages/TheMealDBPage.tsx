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
      console.log('RESULT: ', result);
    } catch (err) {
      setError('Error fetching recipes. Please try again.');
    }
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
              <p className="recipe-instructions">{recipe.strInstructions}</p>
              <ul className="recipe-ingredients">
                {Object.keys(recipe)
                  .filter(
                    (key) =>
                      key.startsWith('strIngredient') &&
                      recipe[key as keyof Recipe]
                  )
                  .map((key, idx) => (
                    <li key={idx}>{recipe[key as keyof Recipe]}</li>
                  ))}
              </ul>
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
