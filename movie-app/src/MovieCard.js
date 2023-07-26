/// src/MovieCard.js
import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <li key={movie.id}>
      <img src={movie.poster} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
      <p>Runtime: {movie.runtime} mins</p>
      <p>Showtime: {movie.showtime}</p>
      <p>Tickets Sold: {movie.tickets_sold}</p>
    </li>
  );
};

export default MovieCard;
