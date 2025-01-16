import { Recipe } from '../types';
import api from './api';

export const searchRecipes = async (name: string): Promise<Recipe[]> => {
  const response = await api.get(`/themealdb/meal/search/${name}`);
  return response.data;
};

export const getRandomRecipe = async (): Promise<Recipe[]> => {
  const response = await api.get(`/themealdb/meal/random`);
  return response.data;
};
