import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/Header.css";

const Header = ({ videos }) => {
  const getVideoIdFromUrl = (url) => {
    const videoId = url.split("watch?v=")[1];
    return videoId;
  };
  return (
    <header className="header-container">
      <h1>Video Recommendation</h1>
      <Carousel infiniteLoop autoPlay showThumbs={false}>
        {videos.map((video) => (
          <div key={video.id}>
            <div className="video-container">
              <iframe
                title={video.title}
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${getVideoIdFromUrl(
                  video.url
                )}?controls=0`}
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
