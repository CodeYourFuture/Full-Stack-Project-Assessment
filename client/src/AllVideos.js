import "./AllVideos.css";
import { useContext, useEffect } from "react";
import { videosContext } from "./App.js";
import TuneIcon from "@mui/icons-material/Tune";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";
import DeleteIcon from "@mui/icons-material/Delete";

export const AllVideos = ({ isDesc, setIsDesc, fetchData }) => {
  const { videos, setVideos } = useContext(videosContext);

  function handleLikes(videoId) {
    fetch(
      `https://full-stack-project-server.onrender.com/videos/${videoId}/like`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to like the video");
        }
        return response.json();
      })
      .then((updatedVideo) => {
        const updatedVideos = videos.map((video) => {
          if (video.id === updatedVideo.id) {
            return updatedVideo;
          }
          return video;
        });
        setVideos(updatedVideos);
      })
      .catch((error) => alert(error.message));
  }

  function handleDislikes(videoId) {
    fetch(
      `https://full-stack-project-server.onrender.com/videos/${videoId}/dislike`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to dislike the video");
        }
        return response.json();
      })
      .then((updatedVideo) => {
        const updatedVideos = videos.map((video) => {
          if (video.id === updatedVideo.id) {
            return updatedVideo;
          }
          return video;
        });
        setVideos(updatedVideos);
      })
      .catch((error) => alert(error.message));
  }

  function handleDelete(videoId) {
    fetch(`https://full-stack-project-server.onrender.com/videos/${videoId}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to delete the video");
        }
        return response.json();
      })
      .then((deletedVideo) => {
        const updatedVideos = videos.filter(
          (video) => Number(video.id) !== Number(deletedVideo.id)
        );
        setVideos(updatedVideos);
      })
      .catch((error) => alert(error.message));
  }

  useEffect(() => {
    console.log(isDesc);
  }, [isDesc]);

  return (
    <div>
      <h2 className="all-videos-title">Videos</h2>
      <div className="all-videos-filter-wrapper">
        <button
          className="all-videos-filter-btn"
          onClick={() => {
            setIsDesc((value) => !value);
            fetchData();
          }}
        >
          {isDesc ? "Top Rated" : "Least Rated"}
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
            <ScrollAnimation animateIn="animate__animated animate__fadeInUp">
              <div
                id="all-videos"
                key={video.id}
                className="video-section-wrapper"
              >
                <iframe
                  src={`https://www.youtube.com/embed/${video.url?.slice(32)}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
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
                    <p className="video-rating-text">{video.ratings} Likes</p>
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
