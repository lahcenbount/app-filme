// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <Link to="/" className="text-white mr-4">Accueil</Link>
      <Link to="/favorites" className="text-white">Favoris</Link>
    </nav>
  );
};

export default Navbar;