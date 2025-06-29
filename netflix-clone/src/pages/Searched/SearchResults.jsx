import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TitleCard from "../../components/TitleCards/TitleCard";

import "./SearchResults.css";
import netflix_spinner from "../../assets/netflix_spinner.gif";
import Navbar from "../../components/Navbar/Navbar";
import back_arraow_icon from "../../assets/back_arrow_icon.png";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  // Get the search query from the URL
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjY0ZjRiMzFkMDQ2NTIyMGI2OWVmZGU2ODM2NDE3MSIsIm5iZiI6MTc1MTAwMDcyOC4wMDEsInN1YiI6IjY4NWUyNjk3ZDhiZjgwODM5MzRkMTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TL4Pekhr9_ipOxUZDSBt41WqJdnt54cz1zmV6ArdjiQ",
    },
  };

  useEffect(() => {
    if (!query) {
      setResults([]);
      setNotFound(false);
      return;
    }
    setLoading(true);
    setNotFound(false);

    fetch(
      `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
        query
      )}&language=en-US&page=1&include_adult=false`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.results && res.results.length > 0) {
          setResults(res.results);
          setNotFound(false);
        } else {
          setResults([]);
          setNotFound(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        setResults([]);
        setNotFound(true);
        setLoading(false);
      });
  }, [query]);

  return (
    <div>
      <Navbar />
      <div className="search-results-page">
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

        <h2
          className="title"
          style={{ color: "#fff", margin: "32px 0 16px 0" }}
        >
          Search Results{query ? ` for "${query}"` : ""}
        </h2>

        {loading && (
          <div className="loading-logo">
            <img src={netflix_spinner} alt="loading logo" />
          </div>
        )}
        {!loading && notFound && (
          <div className="search-not-found">
            <p style={{ color: "#fff" }}>No results found.</p>
          </div>
        )}
        {!loading && results.length > 0 && (
          <TitleCard title="Results" data={results} />
        )}
      </div>
    </div>
  );
};

export default SearchResults;
