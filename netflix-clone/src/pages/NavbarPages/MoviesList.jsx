import React, { useEffect, useState } from "react";
import "./MoviesStyle.css";
import { Link, useNavigate } from "react-router-dom";
import netflix_spinner from "../../assets/netflix_spinner.gif";
import Navbar from "../../components/Navbar/Navbar";
import back_arraow_icon from "../../assets/back_arrow_icon.png";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjY0ZjRiMzFkMDQ2NTIyMGI2OWVmZGU2ODM2NDE3MSIsIm5iZiI6MTc1MTAwMDcyOC4wMDEsInN1YiI6IjY4NWUyNjk3ZDhiZjgwODM5MzRkMTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TL4Pekhr9_ipOxUZDSBt41WqJdnt54cz1zmV6ArdjiQ",
    },
  };

  useEffect(() => {
    setLoading(true);
    fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    )
      .then((res) => res.json())
      .then((res) => {
        setMovies(res.results || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="movies-list-page">
        <img
          src={back_arraow_icon}
          style={{
            cursor: "pointer",
            top: "70px",
            left: "10px",
            width: "50px",
          }}
          onClick={() => {
            navigate(-1);
          }}
          alt="Back"
        />
        <h2>Top Movies List</h2>
        {loading ? (
          <div className="loading-logo">
            <img src={netflix_spinner} alt="loading logo" />
          </div>
        ) : (
          <div className="movies-grid">
            {movies.map((movie) => (
              <Link
                to={`/player/movie/${movie.id}`}
                className="movie-card"
                key={movie.id}
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                      : "https://via.placeholder.com/300x450?text=No+Image"
                  }
                  alt={movie.title}
                  className="movie-poster"
                />
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <p className="movie-date">{movie.release_date}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviesList;
