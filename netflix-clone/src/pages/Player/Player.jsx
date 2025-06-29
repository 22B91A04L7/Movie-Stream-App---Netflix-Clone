import React, { useEffect, useRef, useState } from "react";
import "./Player.css";
import back_arraow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";
import TitleCard from "../../components/TitleCards/TitleCard";
import Footer from "../../components/Footer/Footer";
import netflix_spinner from "../../assets/netflix_spinner.gif";
import Navbar from "../../components/Navbar/Navbar";

const Player = () => {
  const [loading, setLoading] = useState(false);

  const [ApiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  const navigate = useNavigate();

  // Id Fetching
  const { id, media_type } = useParams();
  const endpoint = media_type === "tv" ? "tv" : "movie";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjY0ZjRiMzFkMDQ2NTIyMGI2OWVmZGU2ODM2NDE3MSIsIm5iZiI6MTc1MTAwMDcyOC4wMDEsInN1YiI6IjY4NWUyNjk3ZDhiZjgwODM5MzRkMTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TL4Pekhr9_ipOxUZDSBt41WqJdnt54cz1zmV6ArdjiQ",
    },
  };

  // Fetch trailer video
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/${endpoint}/${id}/videos?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.results && res.results.length > 0) {
          // Find the first YouTube trailer
          const trailer = res.results.find(
            (video) => video.type === "Trailer" && video.site === "YouTube"
          );
          setApiData((prev) => ({
            ...prev,
            key: trailer ? trailer.key : "",
            name: trailer ? trailer.name : "",
            published_at: trailer ? trailer.published_at : "",
            type: trailer ? trailer.type : "",
          }));
        } else {
          setApiData((prev) => ({
            ...prev,
            key: "",
            name: "",
            published_at: "",
            type: "",
          }));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setApiData((prev) => ({
          ...prev,
          key: "",
          name: "",
          published_at: "",
          type: "",
        }));
        setLoading(false);
      });
    // eslint-disable-next-line
  }, [id, media_type]);

  // For other Details Of Video
  const [movie, setMovie] = useState({});

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/${endpoint}/${id}?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((res) => setMovie(res))
      .catch((err) => console.error(err));
    // eslint-disable-next-line
  }, [id, media_type]);

  // For Trending Movies
  const [trending, setTrending] = useState([]);
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      options
    )
      .then((res) => res.json())
      .then((res) => setTrending(res.results))
      .catch((err) => console.error(err));
    // eslint-disable-next-line
  }, []);

  // for Smooth Scroll to trailer
  const trailerRef = useRef(null);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (trailerRef.current) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [id]);

  return loading ? (
    <div className="loading-logo">
      <img src={netflix_spinner} alt="loading" />
    </div>
  ) : (
    <div>
      <Navbar />

      <div className="player">
        <img
          src={back_arraow_icon}
          onClick={() => {
            navigate(-1);
          }}
          alt="Back"
        />
        {ApiData.key ? (
          <iframe
            ref={trailerRef}
            width="90%"
            height="90%"
            title="trailer"
            allowFullScreen
            src={`https://www.youtube.com/embed/${ApiData.key}`}
            frameBorder="0"
          ></iframe>
        ) : (
          <p style={{ color: "#fff", margin: "32px 0", fontSize: "1.2rem" }}>
            No Trailer available.
          </p>
        )}
        <div className="player-info">
          <p>{ApiData.published_at ? ApiData.published_at.slice(0, 10) : ""}</p>
          <h2>{ApiData.name}</h2>
          <p>{ApiData.type}</p>
        </div>
      </div>
      <div className="description">
        <h2>
          Movie Title : <span>{movie.name || movie.title}</span>
        </h2>
        <h3>Description</h3>
        <p>{movie.overview}</p>
        <br />
        <TitleCard
          title={"Top Picks for you"}
          category={media_type === "tv" ? "popular" : "now_playing"}
        />
        <TitleCard title="Trending Movies" data={trending} />
      </div>
      <Footer />
    </div>
  );
};

export default Player;
