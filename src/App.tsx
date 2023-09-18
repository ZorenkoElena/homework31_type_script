import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage';
import BasicTableHeroes from './pages/listOfHeroes';
import BasicTableEpisodes from './pages/listOfEpisodes';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/heroes" element={<BasicTableHeroes />} />
        <Route path="/episodes" element={<BasicTableEpisodes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
