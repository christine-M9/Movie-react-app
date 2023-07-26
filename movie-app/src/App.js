import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [films, setFilms] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    runtime: '',
    showtime: '',
    tickets_sold: '',
    poster: '',
  });

  useEffect(() => {
    fetch('/db.json')
      .then((response) => response.json())
      .then((data) => setFilms(data.films))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewMovie({
      ...newMovie,
      [name]: value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const id = films.length + 1;
    const newMovieWithId = { ...newMovie, id: id.toString() };
    setFilms([...films, newMovieWithId]);
    setNewMovie({
      title: '',
      description: '',
      runtime: '',
      showtime: '',
      tickets_sold: '',
      poster: '',
    });
  };

  return (
    <div className="App">
      <header>
        <h1>MOVIE THEATRE</h1>
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
            <React.Fragment>
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
              <form className="add-movie-form" onSubmit={handleFormSubmit}>
                <h2>Add New Movie</h2>
                <label>
                  Title:
                  <input type="text" name="title" value={newMovie.title} onChange={handleInputChange} required />
                </label>
                <label>
                  Description:
                  <textarea name="description" value={newMovie.description} onChange={handleInputChange} required />
                </label>
                <label>
                  Runtime:
                  <input type="text" name="runtime" value={newMovie.runtime} onChange={handleInputChange} required />
                </label>
                <label>
                  Showtime:
                  <input type="text" name="showtime" value={newMovie.showtime} onChange={handleInputChange} required />
                </label>
                <label>
                  Tickets Sold:
                  <input type="number" name="tickets_sold" value={newMovie.tickets_sold} onChange={handleInputChange} required />
                </label>
                <label>
                  Poster URL:
                  <input type="url" name="poster" value={newMovie.poster} onChange={handleInputChange} required />
                </label>
                <button type="submit">Add Movie</button>
              </form>
            </React.Fragment>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;


