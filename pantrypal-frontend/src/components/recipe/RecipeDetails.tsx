import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import { getRecipeById } from '../../services/recipeService'; 
import { Recipe } from '../../types';

interface RecipeDetailsProps {}

const RecipeDetails: React.FC<RecipeDetailsProps> = () => {
  const { recipeId } = useParams<{ recipeId: string }>(); // Get recipeId from URL
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!recipeId) {
        // If recipeId is not available, navigate to a fallback page (e.g., homepage)
        navigate('/');
        return;
      }

    const fetchRecipe = async () => {
      try {
        const fetchedRecipe = await getRecipeById(parseInt(recipeId));
        setRecipe(fetchedRecipe);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };
    fetchRecipe();
  }, [recipeId]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div>
      <h1>{recipe.recipeName}</h1>
      <p>{'Prep time: ' + recipe.cookingTime + ' min'}</p>
      <p>{'Difficulty level: ' + recipe.difficultyLevel}</p>
    </div>
  );
};

export default RecipeDetails;
