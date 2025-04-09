import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_KEY, BASE_URL } from "../services/config";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(null); // Réinitialiser les erreurs précédentes
        const response = await axios.get(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=fr`
        );
        setMovie(response.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des détails du film', err);
        setError('Désolé, une erreur est survenue. Impossible de récupérer les détails du film.');
      } finally {
        setLoading(false); // S'exécute dans tous les cas (succès ou erreur)
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div>Chargement en cours...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        {error}
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="p-6">
        Aucune donnée disponible pour ce film.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Partie gauche - Affiche du film */}
        <div className="flex-shrink-0">
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full max-w-xs rounded-lg shadow-lg"
              loading="lazy"
            />
          ) : (
            <div className="w-full max-w-xs bg-gray-200 rounded-lg flex items-center justify-center h-96">
              <p>Aucune affiche disponible</p>
            </div>
          )}
        </div>

        {/* Partie droite - Détails du film */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          
          {movie.tagline && (
            <p className="italic text-lg mb-4">"{movie.tagline}"</p>
          )}

          <div className="flex gap-4 mb-4">
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

          <h2 className="text-xl font-semibold mb-2">Synopsis</h2>
          <p className="mb-6">{movie.overview || 'Aucun synopsis disponible.'}</p>

          {movie.genres?.length > 0 ? (
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Genres</h2>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map(genre => (
                  <span key={genre.id} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Genres</h2>
              <p>Aucun genre disponible</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
