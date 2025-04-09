import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <div className="w-64 p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <Link to={`/movie/${movie.id}`}>
        <img 
          src={`/api/placeholder/500/750`} 
          alt={movie.title} 
          className="w-full h-96 object-cover rounded-t-lg" 
        />
        <h3 className="text-lg font-bold mt-2">{movie.title}</h3>
        <p>{movie.release_date}</p>
        <p className="text-yellow-500">{movie.vote_average}</p>
      </Link>
    </div>
  );
};

export default MovieCard;