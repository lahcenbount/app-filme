import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ 
  movies = [], 
  title, 
  isLoading = false,
  onSortChange = null,
  onFilterChange = null 
}) => {
  const [sortOption, setSortOption] = useState('popularity');
  const [filterOption, setFilterOption] = useState('all');
  const [sortedMovies, setSortedMovies] = useState([]);

  useEffect(() => {
    if (movies.length === 0) return;

    let result = [...movies];
    
    // Filtrer si nécessaire
    if (filterOption !== 'all' && onFilterChange) {
      result = onFilterChange(result, filterOption);
    } else {
      // Filtrage par défaut - exemple: score supérieur à 5
      if (filterOption === 'topRated') {
        result = result.filter(movie => movie.vote_average >= 7);
      } else if (filterOption === 'recent') {
        const currentYear = new Date().getFullYear();
        result = result.filter(movie => {
          const year = movie.release_date ? parseInt(movie.release_date.substring(0, 4)) : 0;
          return year >= currentYear - 2;
        });
      }
    }
    
    // Trier les films
    if (onSortChange) {
      result = onSortChange(result, sortOption);
    } else {
      // Tri par défaut
      if (sortOption === 'popularity') {
        result.sort((a, b) => b.popularity - a.popularity);
      } else if (sortOption === 'rating') {
        result.sort((a, b) => b.vote_average - a.vote_average);
      } else if (sortOption === 'date') {
        result.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
      }
    }
    
    setSortedMovies(result);
  }, [movies, sortOption, filterOption, onSortChange, onFilterChange]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-16">
        <div className="loader animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold dark:text-white">{title}</h2>
        
        <div className="flex space-x-3">
          <select 
            value={filterOption}
            onChange={handleFilterChange}
            className="p-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
          >
            <option value="all">Tous les films</option>
            <option value="topRated">Mieux notés</option>
            <option value="recent">Récents</option>
          </select>
          
          <select 
            value={sortOption}
            onChange={handleSortChange}
            className="p-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
          >
            <option value="popularity">Popularité</option>
            <option value="rating">Note</option>
            <option value="date">Date</option>
          </select>
        </div>
      </div>

      {sortedMovies.length === 0 ? (
        <div className="text-center py-10 dark:text-white">
          Aucun film trouvé
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;