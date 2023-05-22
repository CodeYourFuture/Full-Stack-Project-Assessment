import "./AllVideos.css";
import { useContext } from "react";
import { videosContext } from "./App.js";
import TuneIcon from "@mui/icons-material/Tune";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";
import DeleteIcon from "@mui/icons-material/Delete";

// export const AllVideos = ({ desc, setDesc }) => {
export const AllVideos = () => {
  const { videos, setVideos } = useContext(videosContext);

  function handleLikes(videoId) {
    const updatedVideos = videos.map((video) => {
      if (video.id === videoId) {
        return { ...video, rating: video.rating + 1 };
      } else {
        return video;
      }
    });
    setVideos(updatedVideos);
  }

  function handleDislikes(videoId) {
    const updatedVideos = videos.map((video) => {
      if (video.id === videoId) {
        return { ...video, rating: video.rating - 1 };
      } else {
        return video;
      }
    });
    setVideos(updatedVideos);
  }

  function handleDelete(videoId) {
    setVideos(videos.filter((video) => video.id !== videoId));
  }

  return (
    <div className="all-videos-wrapper">
      <h2 className="all-videos-title">Videos</h2>
      <div className="all-videos-filter-wrapper">
        <button
          className="all-videos-filter-btn"
          // onClick={() => setDesc((value) => !value)}
        >
          {/* {desc ? "Top Rated" : "Least Rated"} */}
        </button>

        <TuneIcon
          className="all-videos-filter-icon"
          alt="filter-icon"
          style={{ color: "#e4e0e0" }}
          onClick={() =>
            alert(
              "No function added yet. In the mean time this image is here for it's looks"
            )
          }
        />
      </div>
      <div className="all-videos-container">
        {videos?.map((video) => {
          return (
            <ScrollAnimation
              key={video.id}
              animateIn="animate__animated animate__fadeInUp"
            >
              <div className="video-section-wrapper">
                <iframe
                  src={`https://www.youtube.com/embed/${video.url.slice(33)}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="video-iframe"
                ></iframe>
                <div className="video-text-wrapper">
                  <p className="video-title">{video.title}</p>
                  <div className="video-like-btns-wrapper">
                    <button
                      className="video-like-btn"
                      onClick={() => handleLikes(video.id)}
                    >
                      Like
                    </button>
                    <button
                      className="video-dislike-btn"
                      onClick={() => handleDislikes(video.id)}
                    >
                      Dislike
                    </button>
                    <button
                      className="video-delete-btn"
                      onClick={() => handleDelete(video.id)}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                  <div>
                    <p className="video-rating-text">{video.rating} Likes</p>
                  </div>
                  <div className="video-delete-btn-wrapper"></div>
                </div>
              </div>
            </ScrollAnimation>
          );
        })}
      </div>
    </div>
  );
};
