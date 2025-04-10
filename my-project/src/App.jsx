// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage"; // Assurez-vous que ce chemin est correct
import Favorites from "./pages/Favorites"; // Importez le nouveau composant

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="bg-gray-900 min-h-screen text-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;