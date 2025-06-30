import React, { useEffect, useState } from "react";
import hero_banner from "../../assets/hero_banner.jpg";
import hero_title from "../../assets/hero_title.png";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import TitleCard from "../../components/TitleCards/TitleCard";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [popular, setPopular] = useState([]);
  const [showFullOverview, setShowFullOverview] = useState(false);
  const navigate = useNavigate();

  // Api Key Reference to fetch data from tmdb
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjY0ZjRiMzFkMDQ2NTIyMGI2OWVmZGU2ODM2NDE3MSIsIm5iZiI6MTc1MTAwMDcyOC4wMDEsInN1YiI6IjY4NWUyNjk3ZDhiZjgwODM5MzRkMTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TL4Pekhr9_ipOxUZDSBt41WqJdnt54cz1zmV6ArdjiQ",
    },
  };

  useEffect(() => {
    // Fetching data
    fetch(
      "https://api.themoviedb.org/3/trending/all/day?language=en-US', options",
      options
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.results && res.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * res.results.length);
          setPopular(res.results[randomIndex]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <div className="hero">
        {popular && popular.backdrop_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${popular.backdrop_path}`}
            alt="banner image"
            className="banner-img"
          />
        )}
        <div className={`hero-caption${showFullOverview ? " show-full" : ""}`}>
          <h2 className="popular-title">{popular.name || popular.title}</h2>
          <p className={showFullOverview ? "overview-small" : ""}>
            {showFullOverview
              ? popular.overview
              : popular.overview
              ? popular.overview.split(" ").slice(0, 20).join(" ") +
                (popular.overview.split(" ").length > 20 ? "..." : "")
              : ""}
          </p>

          <div className="hero-btns">
            <button
              className="btn"
              onClick={() => {
                if (popular && popular.id) {
                  navigate(`/player/${popular.media_type}/${popular.id}`);
                }
              }}
            >
              <img src={play_icon} alt="play icon" />
              Play
            </button>
            <button
              className="btn dark-btn"
              onClick={() => setShowFullOverview((prev) => !prev)}
            >
              <img src={info_icon} alt="info-icon" />
              {showFullOverview ? "Show Less" : "More Info"}
            </button>
          </div>
          <TitleCard />
        </div>
      </div>
      <div className="more-cards">
        <br />
        <TitleCard title={"BlockBuster Movies"} category={"top_rated"} />
        <br />
        <TitleCard title={"Only on Movie Stream"} category={"popular"} />
        <br />
        <TitleCard title={"Upcoming Movies"} category={"upcoming"} />
        <br />
        <TitleCard title={"Top Picks for you"} category={"now_playing"} />
      </div>
    </div>
  );
};

export default Hero;
