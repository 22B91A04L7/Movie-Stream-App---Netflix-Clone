import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arraow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const [ApiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  const navigate = useNavigate();

  // Id Fetching
  const { id } = useParams();
  //  Api Reference
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjY0ZjRiMzFkMDQ2NTIyMGI2OWVmZGU2ODM2NDE3MSIsIm5iZiI6MTc1MTAwMDcyOC4wMDEsInN1YiI6IjY4NWUyNjk3ZDhiZjgwODM5MzRkMTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TL4Pekhr9_ipOxUZDSBt41WqJdnt54cz1zmV6ArdjiQ",
    },
  };

  useEffect(() => {
    // Fetching after every page reload
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results[0]))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="player">
      <img
        src={back_arraow_icon}
        onClick={() => {
          navigate(-2);
        }}
        alt=""
      />
      <iframe
        width="90%"
        height="90%"
        title="trailer"
        allowFullScreen
        src={`https://www.youtube.com/embed/${ApiData.key}`}
        frameborder="0"
      ></iframe>
      <div className="player-info">
        <p>{ApiData.published_at.slice(0, 10)}</p>
        <p>{ApiData.name}</p>
        <p>{ApiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
