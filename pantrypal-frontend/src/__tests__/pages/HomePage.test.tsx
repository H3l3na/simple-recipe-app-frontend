import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from '../../pages/HomePage';

jest.mock('../../components/recipe/RecipeForm', () => jest.fn(() => <div>Recipe Form</div>));
jest.mock('../../components/recipe/RecipeList', () => jest.fn(() => <div>Recipe List</div>));

describe('HomePage', () => {
  
  test('renders homepage content correctly', () => {
    render(<HomePage />);
    
    expect(screen.getByText('Welcome to Pantry Pal')).toBeInTheDocument();

    expect(screen.getByText('All Difficulty Levels')).toBeInTheDocument();
    expect(screen.getByText('Create New Recipe')).toBeInTheDocument();
  });

  test('filters recipes by difficulty level', () => {
    render(<HomePage />);
    
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'easy' },
    });

    expect(screen.getByRole('combobox')).toHaveValue('easy');
  });

  test('does not render the RecipeForm initially', () => {
    render(<HomePage />);

    expect(screen.queryByText('Recipe Form')).toBeNull();
  });

});
