import "./VideoCard.css";
import { useEffect } from "react";

const VideoCard = ({ video, fetchVideos }) => {
  const increaseRating = () => {
    if (video) {
      fetch(
        `https://video-server-wtvy.onrender.com/${video.id}?action=thumbs-up`
      )
        .then((response) => response.json())
        .then((data) => {
          fetchVideos();
        })
        .catch((error) => console.error(error));
    }
  };

  const decreaseRating = () => {
    if (video) {
      fetch(
        `https://video-server-wtvy.onrender.com/${video.id}?action=thumbs-down`
      )
        .then((response) => response.json())
        .then((data) => {
          fetchVideos();
        })
        .catch((error) => console.error(error));
    }
  };

  // Extract the YouTube video ID from the link
  const getYouTubeVideoId = (videoLink) => {
    const videoId = videoLink.split("v=")[1];
    if (videoId) {
      const ampersandPosition = videoId.indexOf("&");
      if (ampersandPosition !== -1) {
        return videoId.substring(0, ampersandPosition);
      }
      return videoId;
    }
    return null;
  };
  return (
    <div className="video_card">
      <iframe
        src={`https://www.youtube.com/embed/${getYouTubeVideoId(video.url)}`}
        title={video.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <h1>{video.title}</h1>
      <p>Rating: {video.rating}</p>
      <div className="video_card_controls">
        <img
          src="/media/icons/thumbs_up.svg"
          alt="thumb up - like the video"
          tabIndex="0"
          onClick={increaseRating}
        />
        <img
          src="/media/icons/trash_can.svg"
          alt="trash - remove the video"
          tabIndex="0"
        />
        <img
          src="/media/icons/thumbs_down.svg"
          alt="thumb down - dislike the video"
          tabIndex="0"
          onClick={decreaseRating}
        />
      </div>
    </div>
  );
};

export default VideoCard;
