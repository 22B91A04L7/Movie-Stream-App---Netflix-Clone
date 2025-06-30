import React, { useEffect, useState } from "react";
import "./TitleCard.css";
import { useRef } from "react";
import { Link, useParams } from "react-router-dom";

const TitleCard = ({ title, category, data }) => {
  const cardsRef = useRef();

  const [ApiData, setApiData] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjY0ZjRiMzFkMDQ2NTIyMGI2OWVmZGU2ODM2NDE3MSIsIm5iZiI6MTc1MTAwMDcyOC4wMDEsInN1YiI6IjY4NWUyNjk3ZDhiZjgwODM5MzRkMTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TL4Pekhr9_ipOxUZDSBt41WqJdnt54cz1zmV6ArdjiQ",
    },
  };

  const handleWheel = (e) => {
    e.preventDefault(); // Add parentheses
    cardsRef.current.scrollLeft += e.deltaY;
  };

  const { id, media_type } = useParams();
  const endpoint = media_type === "tv" ? "tv" : "movie";

  useEffect(() => {
    if (data) {
      setApiData(data);
    } else {
      fetch(
        `https://api.themoviedb.org/3/${endpoint}/${
          category ? category : "now_playing"
        }?language=en-US&page=1`,
        options
      )
        .then((res) => res.json())
        .then((res) => {
          setApiData(res.results);
        })
        .catch((err) => console.error(err));
    }

    const ref = cardsRef.current;
    if (ref) {
      ref.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (ref) {
        ref.removeEventListener("wheel", handleWheel);
      }
    };
  }, [category, data]);

  return (
    <div className="titlecards">
      <h2>{title ? title : "Popular on Movie Stream"}</h2>
      <div className="card-list" ref={cardsRef}>
        {ApiData.filter(
          (card) => card.media_type !== "person" && card.backdrop_path
        ).map((card, index) => (
          <Link
            to={`/player/${card.media_type || "movie"}/${card.id}`}
            className="card"
            key={card.id}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
              alt={card.title || card.name}
            />
            <p>{card.title || card.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCard;
