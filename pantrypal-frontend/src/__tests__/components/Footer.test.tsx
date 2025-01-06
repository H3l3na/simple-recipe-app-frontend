import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../../components/Footer';
import '@testing-library/jest-dom';

describe('Footer Component', () => {
  test('renders the footer element', () => {
    render(<Footer />);
    const footerElement = screen.getByRole('contentinfo'); 
    expect(footerElement).toBeInTheDocument();
  });

  test('displays the correct copyright text', () => {
    render(<Footer />);
    const copyrightText = screen.getByText(/© 2024 Pantry Pal. All rights reserved./i);
    expect(copyrightText).toBeInTheDocument();
  });

  test('footer has the correct class name', () => {
    render(<Footer />);
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toHaveClass('footer');
  });
});
