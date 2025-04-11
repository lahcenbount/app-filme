import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MovieCard from './components/MovieCard';
import { API_KEY, BASE_URL } from "../config";

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
          
        const movieResponse = await axios.get(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=fr`,
          { signal }
        );
        setMovie(movieResponse.data);
        
        // Récupération des films similaires
        const similarResponse = await axios.get(
          `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=fr`,
          { signal }
        );
        setSimilarMovies(similarResponse.data.results);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error('Error fetching movie data:', err.response || err.message || err);
          setError('Something went wrong. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovieDetails();
    
    return () => {
      controller.abort();
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-teal-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6 text-red-500 bg-red-100 rounded-lg">
        {error}
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-center p-6 bg-gray-100 rounded-lg">
        Aucun film trouvé.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
      <header className="bg-teal-500 p-4 shadow-md">
        <h1 className="text-4xl font-bold text-center text-white">{movie.title}</h1>
        {movie.tagline && (
          <p className="text-center text-white italic mt-2">"{movie.tagline}"</p>
        )}
      </header>
      
      <main className="p-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 mb-12 bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
          {/* Poster du film */}
          <div className="flex-shrink-0">
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full max-w-xs rounded-lg shadow-md object-cover"
              />
            ) : (
              <div className="w-64 h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Aucune affiche disponible</p>
              </div>
            )}
          </div>
          
          {/* Informations du film */}
          <div className="flex-grow">
            <div className="flex flex-wrap gap-3 mb-4">
              {movie.release_date && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Sortie: {new Date(movie.release_date).toLocaleDateString('fr-FR')}
                </span>
              )}
              
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                Note: {movie.vote_average?.toFixed(1)}/10
              </span>
              
              {movie.runtime && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  Durée: {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min
                </span>
              )}
            </div>
            
            {movie.genres && movie.genres.length > 0 && (
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Genres</h2>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map(genre => (
                    <span 
                      key={genre.id} 
                      className="bg-gray-200 dark:bg-gray-600 px-3 py-1 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <h2 className="text-xl font-semibold mb-2 mt-4">Synopsis</h2>
            <p className="text-gray-700 dark:text-gray-300">
              {movie.overview || 'Aucun synopsis disponible.'}
            </p>
          </div>
        </div>
        
        {/* Films similaires */}
        {similarMovies.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-teal-700 dark:text-teal-300">
              Films Similaires
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {similarMovies.slice(0, 8).map((similarMovie) => (
                <MovieCard key={similarMovie.id} movie={similarMovie} />
              ))}
            </div>
          </>
        )}
      </main>
      
      <footer className="text-center p-4 bg-teal-500 text-white mt-12">
        <p>&copy; {new Date().getFullYear()} Application Films. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default MoviePage;