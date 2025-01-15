import React, { useEffect, useState } from 'react';
import '../styles/component.css';
import RecipeList from '../components/recipe/RecipeList';
import RecipeForm from '../components/recipe/RecipeForm';
import { Recipe } from '../types';

const HomePage: React.FC = () => {
  const [isCreateRecipeFormOpen, setIsCreateRecipeFormOpen] =
    useState<boolean>(false);
  const [nameFilter, setNameFilter] = useState<string>(''); // Filter by name
  const [difficultyFilter, setDifficultyFilter] = useState<string>(''); // Filter by difficulty
  const [cookingTimeFilter, setCookingTimeFilter] = useState<
    number | undefined
  >(undefined); // Filter by cooking time
  const [cuisineFilter, setCuisineFilter] = useState<string>(''); // Filter by cuisine

  // Handle the change in name filter
  const handleNameFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(e.target.value);
  };

  // Handle the change in difficulty filter
  const handleDifficultyFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDifficultyFilter(e.target.value);
  };

  // Handle the change in cooking time filter
  const handleCookingTimeFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setCookingTimeFilter(value === '' ? undefined : parseInt(value, 10));
  };

  // Handle the change in cuisine filter
  const handleCuisineFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCuisineFilter(e.target.value);
  };

  return (
    <main>
      <h1>Welcome to Pantry Pal</h1>
      <div className="filter-container">
        <input
          type="text"
          className="name-filter"
          value={nameFilter}
          onChange={handleNameFilterChange}
          placeholder="Search by Recipe Name"
        />

        <select
          className="difficulty-filter"
          value={difficultyFilter}
          onChange={handleDifficultyFilterChange}
        >
          <option value="">All Difficulty Levels</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <input
          type="number"
          className="cooking-time-filter"
          value={cookingTimeFilter || ''}
          onChange={handleCookingTimeFilterChange}
          placeholder="Max Cooking Time (min)"
          min="1"
        />

        <input
          type="text"
          className="cuisine-filter"
          value={cuisineFilter}
          onChange={handleCuisineFilterChange}
          placeholder="Search by Cuisine Type"
        />
      </div>

      <div className="new-recipe-container">
        <button
          className="new-recipe-button"
          onClick={() => setIsCreateRecipeFormOpen(true)}
        >
          Create New Recipe
        </button>
      </div>

      {isCreateRecipeFormOpen && (
        <RecipeForm onClose={setIsCreateRecipeFormOpen} />
      )}

      <RecipeList
        nameFilter={nameFilter}
        difficultyFilter={difficultyFilter}
        cookingTimeFilter={cookingTimeFilter}
        cuisineFilter={cuisineFilter}
      />
    </main>
  );
};

export default HomePage;
