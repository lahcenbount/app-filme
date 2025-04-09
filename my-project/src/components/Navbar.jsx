import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ toggleTheme, isDarkMode }) => {
  return (
    <nav className="bg-teal-500 p-4 flex justify-between items-center">
      <Link to="/" className="text-white text-2xl font-bold">MovieApp</Link>
     <button
  onClick={toggleTheme}
  className={`px-4 py-2 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
  aria-label={isDarkMode ? 'Passer en mode clair' : 'Passer en mode sombre'}
>
  {isDarkMode ? 'Mode Clair' : 'Mode Sombre'}
</button>
    </nav>
  );
};

export default Navbar;
