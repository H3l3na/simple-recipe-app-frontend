import { Recipe } from '../types';
import api from './api';

export const fetchAllRecipes = async (): Promise<Recipe[]> => {
  const response = await api.get('/recipes/all');
  return response.data;
};

export const fetchMyRecipes = async (userId: number): Promise<Recipe[]> => {
    const response = await api.get(`/recipes/favorite/${userId}`);
    return response.data;
};

export const createRecipe = async (recipe: Recipe): Promise<Recipe> => {
  const response = await api.post('/recipes/create', recipe);
  return response.data;
};

export const getRecipeById = async (id: number): Promise<Recipe> => {
  const response = await api.get(`/recipes/${id}`);
  return response.data;
};

export const addToFavorites = async (userId: number, recipeId: number): Promise<void> => {
    const response = await api.post(`/users/${userId}/favorite`, { recipeId });
    return response.data;  
  };

export const deleteRecipe = async (recipeId: number): Promise<void> => {
    const response = await api.delete(`/recipes/${recipeId}`);
    return response.data;
  };
