import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RecipeForm from '../../../components/recipe/RecipeForm'; 
import '@testing-library/jest-dom';
import * as recipeService from '../../../services/recipeService';

jest.mock('../../../services/recipeService', () => ({
  createRecipe: jest.fn(),
}));

describe('RecipeForm Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders the form with default values', () => {
    render(<RecipeForm />);

    expect(screen.getByPlaceholderText('Recipe Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Difficulty Level')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Cooking Time (min)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Preparation Steps')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ingredient Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Quantity')).toBeInTheDocument();
  });

  test('can type in the input fields', () => {
    render(<RecipeForm />);

    fireEvent.change(screen.getByPlaceholderText('Recipe Name'), {
      target: { value: 'Pasta' },
    });
    fireEvent.change(screen.getByPlaceholderText('Difficulty Level'), {
      target: { value: 'Easy' },
    });

    expect(screen.getByPlaceholderText('Recipe Name').value).toBe('Pasta');
    expect(screen.getByPlaceholderText('Difficulty Level').value).toBe('Easy');
  });

  test('adds an ingredient to the list', () => {
    render(<RecipeForm />);

    fireEvent.change(screen.getByPlaceholderText('Ingredient Name'), {
      target: { value: 'Tomato' },
    });
    fireEvent.change(screen.getByPlaceholderText('Quantity'), {
      target: { value: '2' },
    });

    fireEvent.click(screen.getByText('Add Ingredient'));

    expect(screen.getByText('Tomato - 2')).toBeInTheDocument();
  });

  test('removes an ingredient from the list', () => {
    render(<RecipeForm />);

    fireEvent.change(screen.getByPlaceholderText('Ingredient Name'), {
      target: { value: 'Tomato' },
    });
    fireEvent.change(screen.getByPlaceholderText('Quantity'), {
      target: { value: '2' },
    });
    fireEvent.click(screen.getByText('Add Ingredient'));

    fireEvent.click(screen.getByText('Remove'));

    expect(screen.queryByText('Tomato - 2')).toBeNull();
  });

  test('submits the form successfully', async () => {
    render(<RecipeForm />);

    fireEvent.change(screen.getByPlaceholderText('Recipe Name'), {
      target: { value: 'Pasta' },
    });
    fireEvent.change(screen.getByPlaceholderText('Difficulty Level'), {
      target: { value: 'Easy' },
    });

    recipeService.createRecipe.mockResolvedValue({
      recipeId: 1,
      recipeName: 'Pasta',
      difficultyLevel: 'Easy',
      cookingTime: '15',
      preparationSteps: 'Boil pasta, prepare sauce',
      ingredients: [],
    });

    fireEvent.click(screen.getByText('Submit Recipe'));

    await waitFor(() => {
      expect(recipeService.createRecipe).toHaveBeenCalledTimes(1);
      expect(recipeService.createRecipe).toHaveBeenCalledWith({
        recipeName: 'Pasta',
        cookingTime: '0',
        difficultyLevel: 'Easy',
        preparationSteps: '',
        ingredients: [],
      });
    });
  });

  test('handles the recipe creation failure', async () => {
    render(<RecipeForm />);

    fireEvent.change(screen.getByPlaceholderText('Recipe Name'), {
      target: { value: 'Pasta' },
    });
    fireEvent.change(screen.getByPlaceholderText('Difficulty Level'), {
      target: { value: 'Easy' },
    });

    recipeService.createRecipe.mockRejectedValue(new Error('Failed to create recipe'));

    fireEvent.click(screen.getByText('Submit Recipe'));

    await waitFor(() => {
      expect(recipeService.createRecipe).toHaveBeenCalledTimes(1);
      expect(recipeService.createRecipe).toHaveBeenCalledWith({
        recipeName: 'Pasta',
        cookingTime: '0',
        difficultyLevel: 'Easy',
        preparationSteps: '',
        ingredients: [],
      });
    });
  });
});
