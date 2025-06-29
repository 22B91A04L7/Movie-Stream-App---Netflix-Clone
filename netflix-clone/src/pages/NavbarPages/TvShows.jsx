import React, { useEffect, useState } from "react";
import "../../pages/NavbarPages/TvShows.css";
import { Link, useNavigate } from "react-router-dom";
import netflix_spinner from "../../assets/netflix_spinner.gif";
import Navbar from "../../components/Navbar/Navbar";
import back_arraow_icon from "../../assets/back_arrow_icon.png";

const TvShows = () => {
  const [shows, setShows] = useState([]);
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
    fetch("https://api.themoviedb.org/3/tv/changes?page=1", options)
      .then((res) => res.json())
      .then(async (res) => {
        const ids = res.results.slice(10, 29).map((item) => item.id);
        const validShows = [];

        for (let id of ids) {
          try {
            // Fetch show details and videos (trailers) simultaneously
            const [details, videos] = await Promise.all([
              fetch(
                `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
                options
              ).then((r) => r.json()),
              fetch(
                `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`,
                options
              ).then((r) => r.json()),
            ]);

            // Check if there's at least one valid YouTube trailer
            const hasTrailer = videos.results?.some(
              (video) => video.type === "Trailer" && video.site === "YouTube"
            );

            // Push to list only if name, poster, and trailer exist
            if (hasTrailer && details?.name && details?.poster_path) {
              validShows.push(details);
            }
          } catch (error) {
            console.error("Error fetching show/videos for ID:", id, error);
          }
        }

        setShows(validShows);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching TV changes:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="tv-shows-page">
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
        <h2>Latest TV Shows</h2>
        {loading ? (
          <div className="loading-logo">
            <img src={netflix_spinner} alt="loading logo" />
          </div>
        ) : (
          <div className="tvshows-grid">
            {shows
              .filter((show) => show.name && show.poster_path)
              .map((show) => (
                <Link
                  to={`/player/tv/${show.id}`}
                  className="tvshow-card"
                  key={show.id}
                >
                  <img
                    src={
                      show.poster_path
                        ? `https://image.tmdb.org/t/p/w300${show.poster_path}`
                        : "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    alt={show.name}
                    className="tvshow-poster"
                  />
                  <div className="tvshow-info">
                    <h3>{show.name || "Untitled"}</h3>
                    <p className="tvshow-date">
                      {show.first_air_date || "Unknown date"}
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

export default TvShows;
