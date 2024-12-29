import { Recipe } from '../types';
import api from './api';

export const fetchAllRecipes = async (): Promise<Recipe[]> => {
  const response = await api.get('/recipes/all');
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
