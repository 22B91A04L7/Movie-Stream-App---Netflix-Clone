import React, { useEffect } from "react";
import Home from "./pages/Home/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Player from "./pages/Player/Player";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";
import { ToastContainer, toast } from "react-toastify";
import SearchResults from "./pages/Searched/SearchResults";
import TvShows from "./pages/NavbarPages/TvShows";
import MoviesList from "./pages/NavbarPages/MoviesList";
import Popular from "./pages/NavbarPages/Popular";

const App = () => {
  // Login and LogOut Pages Redirecting
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Logged In");
        navigate("/");
      } else {
        console.log("Logged Out");
        navigate("/login");
      }
    });
  }, []);

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:media_type/:id" element={<Player />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/tv-shows" element={<TvShows />} />
        <Route path="/movies-list" element={<MoviesList />} />
        <Route path="/popular-movies" element={<Popular />} />
      </Routes>
    </div>
  );
};

export default App;
