import React, { useEffect, useState } from "react";
import "./Popular.css";
import { Link, useNavigate } from "react-router-dom";
import netflix_spinner from "../../assets/netflix_spinner.gif";
import Navbar from "../../components/Navbar/Navbar";
import back_arraow_icon from "../../assets/back_arrow_icon.png";

const Popular = () => {
  const [items, setItems] = useState([]);
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
      "https://api.themoviedb.org/3/trending/all/day?language=en-US",
      options
    )
      .then((res) => res.json())
      .then((res) => {
        setItems(res.results || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <Navbar />

      <div className="popular-page">
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
        <h2>Trending Now</h2>
        {loading ? (
          <div className="loading-logo">
            <img src={netflix_spinner} alt="loading logo" />
          </div>
        ) : (
          <div className="popular-grid">
            {items
              .filter((item) => (item.title || item.name) && item.poster_path)
              .map((item) => (
                <Link
                  to={`/player/${item.media_type}/${item.id}`}
                  className="popular-card"
                  key={item.id}
                >
                  <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                        : "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    alt={item.title || item.name}
                    className="popular-poster"
                  />
                  <div className="popular-info">
                    <h3>{item.title || item.name || "Untitled"}</h3>
                    <p className="popular-date">
                      {item.release_date ||
                        item.first_air_date ||
                        "Unknown date"}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Popular;
