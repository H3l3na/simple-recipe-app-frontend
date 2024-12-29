import React, { useEffect, useState } from 'react';
import '../styles/component.css';
import RecipeList from '../components/recipe/RecipeList';
import RecipeForm from '../components/recipe/RecipeForm';

const HomePage: React.FC = () => {
    const [isCreateRecipeFormOpen, setIsCreateRecipeFormOpen] = useState<boolean>(false);
    const [difficultyFilter, setDifficultyFilter] = useState<string>('');

    // Handle the change in difficulty filter
    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setDifficultyFilter(e.target.value); 
    };

    useEffect(() => {

    }, [difficultyFilter]);

  return (
    <main>
      <h1>Welcome to Pantry Pal</h1>

      <div className="filter-container">
        <select
          className="difficulty-filter"
          value={difficultyFilter}
          onChange={handleFilterChange}
        >
          <option value="">All Difficulty Levels</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="new-recipe-container">
        <button className="new-recipe-button" onClick={() => setIsCreateRecipeFormOpen(true)}>
          Create New Recipe
        </button>
      </div>
      {isCreateRecipeFormOpen && <RecipeForm />}
      <RecipeList difficultyFilter={difficultyFilter}/>
    </main>
  );
};

export default HomePage;