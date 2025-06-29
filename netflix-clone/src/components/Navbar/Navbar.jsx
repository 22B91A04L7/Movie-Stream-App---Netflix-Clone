import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import searchIcon from "../../assets/search_icon.svg";
import bellIcon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";
import { logout } from "../../Firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase";
import { db } from "../../Firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); //Search Bar
  const [userName, setUserName] = useState(""); // To fetch username
  const [showNotifications, setShowNotifications] = useState(false); //for notifications

  useEffect(() => {
    // To Know user Name
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch user name from Firestore
        const q = query(collection(db, "user"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setUserName(querySnapshot.docs[0].data().name);
        } else {
          setUserName(user.email || "User");
        }
      } else {
        setUserName("");
      }
    });
    // scroll condition
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`navbar${scrolled ? " navbar-scrolled" : ""}`}>
      <div className="navbar-left">
        <img onClick={() => navigate("/")} src={logo} alt="" />
        <ul>
          <li onClick={() => navigate("/")}>Home</li>
          <li onClick={() => navigate("/tv-shows")}>TV Shows</li>
          <li onClick={() => navigate("/movies-list")}>Movies List</li>
          <li onClick={() => navigate("/popular-movies")}>New and Popular</li>
        </ul>
      </div>
      <div className="navbar-right">
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search movies, shows..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
              }
            }}
          />
          <img
            src={searchIcon}
            alt="search-icon"
            onClick={() =>
              navigate(`/search?q=${encodeURIComponent(searchTerm)}`)
            }
            style={{ cursor: "pointer" }}
          />
        </div>

        <div
          style={{ position: "relative" }}
          onMouseEnter={() => setShowNotifications(true)}
          onMouseLeave={() => setShowNotifications(false)}
        >
          <img
            src={bellIcon}
            alt="bell-icon"
            style={{ cursor: "pointer" }}
            // onClick={() => setShowNotifications((prev) => !prev)}
          />
          {showNotifications && (
            <div
              className="notifications-dropdown"
              style={{
                position: "absolute",
                right: 0,
                top: "40px",
                background: "#222",
                color: "#fff",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                minWidth: "220px",
                zIndex: 10,
                padding: "16px",
              }}
            >
              <p className="bell-icon">
                🔔<span>No new notifications</span>
              </p>
            </div>
          )}
        </div>
        <p>{userName}</p>
        <div className="navbar-profile">
          <img src={profile_img} alt="profile-image" />
          <img src={caret_icon} alt="dropdown icon" />
          <div className="dropdown">
            <p
              onClick={() => {
                logout();
              }}
            >
              Sign Out of Netflix
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
