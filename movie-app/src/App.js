import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [films, setFilms] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch('/db.json')
      .then((response) => response.json())
      .then((data) => setFilms(data.films))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="App">
      <header>
        <h1>Movie List</h1>
      </header>
      <main>
        <div className="container">
          {selectedMovie ? (
            <div className="selected-movie">
              <img src={selectedMovie.poster} alt={selectedMovie.title} />
              <h2>{selectedMovie.title}</h2>
              <p>{selectedMovie.description}</p>
              <p>Runtime: {selectedMovie.runtime} mins</p>
              <p>Showtime: {selectedMovie.showtime}</p>
              <p>Tickets Sold: {selectedMovie.tickets_sold}</p>
              <button onClick={() => setSelectedMovie(null)}>Back to List</button>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Runtime</th>
                  <th>Showtime</th>
                  <th>Tickets Sold</th>
                </tr>
              </thead>
              <tbody>
                {films.map((film) => (
                  <tr key={film.id} onClick={() => handleMovieClick(film)}>
                    <td>{film.title}</td>
                    <td>{film.description}</td>
                    <td>{film.runtime} mins</td>
                    <td>{film.showtime}</td>
                    <td>{film.tickets_sold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
