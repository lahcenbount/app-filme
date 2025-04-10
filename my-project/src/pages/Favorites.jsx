// src/pages/Favorites.js
import React, { useEffect, useState } from 'react';
import MovieList from '../components/MovieList'; // Vérifiez que ce chemin est correct

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    try {
      // Récupère les favoris depuis localStorage avec une valeur par défaut sécurisée
      const storedFavorites = JSON.parse(localStorage.getItem('react-movie-app-favorites')) || [];
      // Vérifie que c'est un tableau valide
      if (Array.isArray(storedFavorites)) {
        setFavorites(storedFavorites);
      } else {
        setFavorites([]); // Réinitialise si les données sont corrompues
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des favoris :', error);
      setFavorites([]); // Valeur par défaut en cas d'erreur
    }
  }, []); // Dépendance vide pour ne s'exécuter qu'au montage

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-teal-600 mb-6 text-center">
          Mes Films Favoris
        </h1>
        {favorites.length > 0 ? (
          <MovieList movies={favorites} />
        ) : (
          <p className="text-gray-600 text-center">
            Aucun film favori trouvé. Ajoutez-en depuis la page d'accueil !
          </p>
        )}
      </div>
    </div>
  );
};

export default Favorites;