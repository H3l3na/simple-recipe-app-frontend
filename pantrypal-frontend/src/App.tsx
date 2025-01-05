import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RecipePage from './pages/RecipePage';
import Header from './components/Header';
import Footer from './components/Footer';
import FavoriteRecipesPage from './pages/FavoriteRecipesPage';
import RecipeDetails from './components/recipe/RecipeDetails';
import RandomRecipePage from './pages/RandomRecipePage';
import TheMealDBPage from './pages/TheMealDBPage';

const App: React.FC = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/recipes" element={<RecipePage />} />
      <Route path="/favorites" element={<FavoriteRecipesPage />} />
      <Route path="/random" element={<RandomRecipePage />} />
      <Route path="/themealdb" element={<TheMealDBPage />} />
      <Route path="/recipe/:recipeId" element={<RecipeDetails />} /> 
    </Routes>
    <Footer />
  </Router>
);

export default App;