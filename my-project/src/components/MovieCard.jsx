import React from 'react';
import { Link } from 'react-router-dom';

// Note : API_KEY et BASE_URL ne sont pas utilisées ici, mais conservées pour cohérence
const API_KEY = '777d8d18'; // Clé OMDB API (non utilisée dans ce composant)
const BASE_URL = 'https://www.omdbapi.com/'; // OMDB API (non utilisée ici)

const MovieCard = ({ movie }) => {
  // Vérification de la validité de movie
  if (!movie || (!movie.id && !movie.imdbID)) {
    return <div className="text-center p-4">Film invalide</div>;
  }

  // Déterminer si on utilise TMDb ou OMDB pour l'image
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` // TMDb
    : movie.Poster && movie.Poster !== 'N/A'
    ? movie.Poster // OMDB
    : 'https://via.placeholder.com/200x300?text=No+Image'; // Fallback

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
      <img
        src={posterUrl}
        alt={movie.title || movie.Title || 'Titre indisponible'}
        className="w-full h-56 object-cover rounded-t-lg"
        loading="lazy" // Optimisation du chargement
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/200x300?text=No+Image'; // Gestion d'erreur
        }}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {movie.title || movie.Title || 'Titre non disponible'}
        </h3>
        <p className="text-sm text-gray-600">
          {movie.overview
            ? `${movie.overview.slice(0, 100)}...`
            : 'Aucune description disponible'}
        </p>
        <Link
          to={`/movie/${movie.id || movie.imdbID}`}
          className="text-teal-500 hover:text-teal-700 transition-colors mt-2 inline-block"
        >
          Voir plus
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;