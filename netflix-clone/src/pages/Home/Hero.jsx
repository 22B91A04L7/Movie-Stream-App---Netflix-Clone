import React from "react";
import hero_banner from "../../assets/hero_banner.jpg";
import hero_title from "../../assets/hero_title.png";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import TitleCard from "../../components/TitleCards/TitleCard";
import "./Home.css";

const Hero = () => {
  return (
    <div>
      <div className="hero">
        <img src={hero_banner} alt="banner image" className="banner-img" />
        <div className="hero-caption">
          <img src={hero_title} alt="caption-img" className="caption-img" />
          <p>
            Discovering his ties to a secret anient order, a young man living in
            modern Istanbul embarks on a quest to save the city from an immortal
            enemy.
          </p>

          <div className="hero-btns">
            <button className="btn">
              <img src={play_icon} alt="play icon" />
              Play
            </button>
            <button className="btn dark-btn">
              <img src={info_icon} alt="info-icon" />
              More Info
            </button>
          </div>
          <TitleCard />
        </div>
      </div>
      <div className="more-cards">
        <br />
        <TitleCard title={"BlockBuster Movies"} category={"top_rated"} />
        <br />
        <TitleCard title={"Only on Netflix"} category={"popular"} />
        <br />
        <TitleCard title={"Upcoming Movies"} category={"upcoming"} />
        <br />
        <TitleCard title={"Top Picks for you"} category={"now_playing"} />
      </div>
    </div>
  );
};

export default Hero;
