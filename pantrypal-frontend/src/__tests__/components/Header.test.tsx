import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../../components/Header';

describe('Header Component', () => {
  test('renders the header with logo and navigation links', () => {
    render(<Header />);

    const logo = screen.getByText('Pantry Pal');
    expect(logo).toBeInTheDocument();

    const homeLink = screen.getByText('Home');
    const recipesLink = screen.getByText('Recipes');
    const favoritesLink = screen.getByText('Favorites');

    expect(homeLink).toBeInTheDocument();
    expect(recipesLink).toBeInTheDocument();
    expect(favoritesLink).toBeInTheDocument();
  });

  test('navigation links have correct href attributes', () => {
    render(<Header />);

    const homeLink = screen.getByText('Home');
    const recipesLink = screen.getByText('Recipes');
    const favoritesLink = screen.getByText('Favorites');

    expect(homeLink).toHaveAttribute('href', '/');
    expect(recipesLink).toHaveAttribute('href', '/recipes');
    expect(favoritesLink).toHaveAttribute('href', '/favorites');
  });

  test('header has the correct class name', () => {
    render(<Header />);

    const headerElement = screen.getByRole('banner');
    expect(headerElement).toHaveClass('header');
  });
});
