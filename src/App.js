import React, { useState, useEffect } from "react";
import "./App.css";
import Fotos from "./fotos";

const INITIAL_MOVIE = "";

function getShipNames(selectedMovieId, ships) {
  // this function is getting only movies names and joins them together (conncatinates them)
  return getShipsFromMovie(selectedMovieId, ships)
    .map(ship => ship.name)
    .join(", ");
}
function getSelectedMovieTitle(selectedMovieId, movies) {
  const selectedMovie = movies.find(movie => {
    return `${movie.episode_id}` === selectedMovieId;
  });

  return selectedMovie ? selectedMovie.title : "";
}

function getShipsFromMovie(selectedMovieId, ships) {
  // this function returns all the ships that have a film of id selectedMovieId
  const movieUrl = `https://swapi.co/api/films/${selectedMovieId}/`;
  return ships.filter(ship => ship.films.includes(movieUrl));
}

function App() {
  const [selectedMovieId, setSelectedMovieId] = useState(INITIAL_MOVIE);
  const [movies, setMovies] = useState([]);
  const [ships, setShips] = useState([]);
  console.log({ selectedMovieId });

  useEffect(() => {
    // when component mounts, we fetch for movies and ships
    fetch("https://cors-anywhere.herokuapp.com/https://swapi.co/api/films")
      .then(data => data.json())
      .then(parsedData => {
        console.log({ films: parsedData.results });
        setMovies(parsedData.results);
      });

    fetch("https://cors-anywhere.herokuapp.com/https://swapi.co/api/starships")
      .then(data => data.json())
      .then(parsedData => {
        setShips(parsedData.results);
      });
  }, []);

  // when data is empty, it probably means that it is still being loaded
  if (movies.length === 0 && ships.length === 0) {
    return "LOADING...";
  }

  return (
    <div className="App">
      <h1>StarshipTroopers</h1>
      <p>
        {selectedMovieId &&
          `${getShipNames(selectedMovieId, ships)}  
          starred in the film '${getSelectedMovieTitle(
            selectedMovieId,
            movies
          )}'.`}
      </p>
      <select
        onChange={event => {
          setSelectedMovieId(event.target.value);
        }}
        value={selectedMovieId}
      >
        <option value={INITIAL_MOVIE}>Please select the movie</option>
        {movies.map(movie => {
          const { title, episode_id } = movie;
          return (
            <option key={episode_id} value={episode_id}>
              {title}
            </option>
          );
        })}
      </select>
      <Fotos selectedMovieId={selectedMovieId} />
    </div>
  );
}

export default App;
