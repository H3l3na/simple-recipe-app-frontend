import { render, screen } from '@testing-library/react';
import RecipePage from '../../pages/RecipePage'; 
import RecipeList from '../../components/recipe/RecipeList';

jest.mock('../../components/recipe/RecipeList', () => jest.fn(() => <div>Recipe List</div>));

describe('RecipePage', () => {
  
  test('renders the recipe page correctly', () => {
    render(<RecipePage />);
    
    expect(screen.getByText('All Recipes')).toBeInTheDocument();
  });

  test('renders the RecipeList component with correct props', () => {
    render(<RecipePage />);

    expect(RecipeList).toHaveBeenCalled();
    expect(RecipeList.mock.calls[0][0]).toEqual(expect.objectContaining({
      difficultyFilter: ''
    }));
  });

});
