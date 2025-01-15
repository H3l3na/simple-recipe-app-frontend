import api from './api';

export const rateRecipe = async ({
  recipeId,
  stars,
}: {
  recipeId: number;
  stars: number;
}) => {
  const response = await api.post('/recipes/rating/add', { recipeId, stars });
  return response.data;
};
