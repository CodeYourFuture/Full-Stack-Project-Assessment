import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/Header.css";

const Header = () => {
  const youtubeLink = "https://youtu.be/FUeyrEN14Rk";

  return (
    <header className="header-container">
      <h1>Video Recommendation</h1>
      <Carousel infiniteLoop autoPlay showThumbs={false}>
        {[...Array(5)].map((_, index) => (
          <div key={index}>
            <div className="video-container">
              <iframe
                title={`Video ${index + 1}`}
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${youtubeLink}`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ))}
      </Carousel>
    </header>
  );
};

export default Header;
