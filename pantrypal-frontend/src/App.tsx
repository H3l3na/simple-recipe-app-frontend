import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RecipePage from './pages/RecipePage';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/recipes" element={<RecipePage />} />
    </Routes>
    <Footer />
  </Router>
);

export default App;