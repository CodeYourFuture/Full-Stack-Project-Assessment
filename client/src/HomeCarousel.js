import "./HomeCarousel.css";
import { useContext } from "react";
import { videosContext } from "./App.js";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const HomeCarousel = () => {
  const { videos } = useContext(videosContext);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 1800, min: 1400 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1400, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 375 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 375, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="home-carousel-wrapper">
      <h2 className="home-carousel-title">Latest Releases</h2>
      <Carousel className="home-carousel" responsive={responsive}>
        {videos
          ?.sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((video) => {
            return (
              <div className="" key={video.id}>
                <iframe
                  id="all-videos"
                  width="370"
                  height="201"
                  src={`https://www.youtube.com/embed/${
                    video.url.split("=")[1]
                  }`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="home-carousel-iframe"
                ></iframe>
              </div>
            );
          })}
      </Carousel>
    </div>
  );
};
