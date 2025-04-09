import React, { useState } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = '777d8d18';
  const BASE_URL = 'https://www.omdbapi.com/';

  const fetchMovies = async (searchQuery) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchQuery)}`);
      if (response.data.Response === "True") {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
        setError('Aucun film trouvé');
      }
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError('Erreur lors de la récupération des films');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      fetchMovies(query);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-teal-600 mb-4">Search for Movies</h1>
        
        {/* Search input and button */}
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter movie title"
            className="w-full px-4 py-2 border border-teal-500 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
          />
          <button 
            onClick={handleSearch}
            className="px-4 py-2 bg-teal-600 text-white rounded-r-lg hover:bg-teal-700 transition duration-200"
          >
            Search
          </button>
        </div>

        {/* Loading and error message */}
        {loading && <p className="text-teal-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Movie Results */}
        <div className="mt-4">
          {movies.length > 0 && !loading && !error ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {movies.map((movie) => (
                <li key={movie.imdbID} className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold text-teal-600">{movie.Title}</h3>
                  <img 
                    src={movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/200'} 
                    alt={movie.Title} 
                    className="w-full h-64 object-cover rounded mt-2"
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

