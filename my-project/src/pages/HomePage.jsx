import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const API_KEY = '777d8d18'; // Clé OMDB API
  const BASE_URL = 'https://www.omdbapi.com/';

  // Charger les favoris au montage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('react-movie-app-favorites')) || [];
    if (Array.isArray(storedFavorites)) {
      setFavorites(storedFavorites);
    }
  }, []);

  // Récupérer les films via l'API OMDB
  const fetchMovies = async (searchQuery) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchQuery)}`
      );
      if (response.data.Response === 'True') {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
        setError(response.data.Error || 'Aucun film trouvé');
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des films :', err);
      setError('Une erreur est survenue lors de la recherche');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  // Gérer la recherche
  const handleSearch = () => {
    if (query.trim() === '') {
      setError('Veuillez entrer un titre de film');
      return;
    }
    fetchMovies(query);
  };

  // Ajouter ou retirer un film des favoris
  const toggleFavorite = (movie) => {
    const updatedFavorites = favorites.some((fav) => fav.imdbID === movie.imdbID)
      ? favorites.filter((fav) => fav.imdbID !== movie.imdbID)
      : [...favorites, movie];

    setFavorites(updatedFavorites);
    localStorage.setItem('react-movie-app-favorites', JSON.stringify(updatedFavorites));
  };

  // Gestion de la touche "Entrée" pour la recherche


  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-teal-600 mb-6 text-center">
          Rechercher des Films
        </h1>

        {/* Barre de recherche */}
        <div className="flex items-center space-x-2 mb-6">
        <input
  type="text"
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  placeholder="Enter movie title"
  className="w-full px-4 py-2 border border-teal-500 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-teal-300 text-black placeholder-gray-400"
/>
          <button
            onClick={handleSearch}
            disabled={loading} // Désactiver pendant le chargement
            className={`px-4 py-2 bg-teal-600 text-white rounded-r-lg hover:bg-teal-700 transition duration-200 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Chargement...' : 'Rechercher'}
          </button>
        </div>

        {/* Messages d'état */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {loading && <p className="text-teal-500 text-center mb-4">Chargement...</p>}

        {/* Résultats */}
        {!loading && movies.length > 0 && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {movies.map((movie) => (
              <li
                key={movie.imdbID}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200"
              >
                <h3 className="text-xl font-bold text-teal-600 truncate">{movie.Title}</h3>
                <img
                  src={
                    movie.Poster !== 'N/A'
                      ? movie.Poster
                      : 'https://via.placeholder.com/200x300?text=No+Image'
                  }
                  alt={movie.Title}
                  className="w-full h-64 object-cover rounded mt-2"
                  loading="lazy" // Optimisation
                  onError={(e) =>
                    (e.target.src = 'https://via.placeholder.com/200x300?text=No+Image')
                  } // Gestion d'erreur image
                />
                <button
                  onClick={() => toggleFavorite(movie)}
                  className={`mt-3 w-full px-4 py-2 rounded text-white transition duration-200 ${
                    favorites.some((fav) => fav.imdbID === movie.imdbID)
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-teal-600 hover:bg-teal-700'
                  }`}
                >
                  {favorites.some((fav) => fav.imdbID === movie.imdbID)
                    ? 'Retirer des favoris'
                    : 'Ajouter aux favoris'}
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Message si aucun résultat */}
        {!loading && !error && movies.length === 0 && query && (
          <p className="text-gray-600 text-center mt-4">
            Aucun film trouvé pour "{query}".
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;