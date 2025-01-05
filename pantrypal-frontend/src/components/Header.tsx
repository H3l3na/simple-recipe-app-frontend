import React from 'react';
import '../styles/component.css'; 

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo">Pantry Pal</div>
      <nav>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/recipes">Recipes</a></li>
          <li><a href="/favorites">Favorites</a></li>
          <li><a href="/random">Random</a></li>
          <li><a href="/themealdb">The Meal DB</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
