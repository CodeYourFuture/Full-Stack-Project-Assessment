import "./VideoCard.css";

const VideoCard = ({ video, updateVideoRating, deleteVideo }) => {
  // Increase the rating of the video
  const increaseRating = () => {
    if (video) {
      fetch(
        `https://video-server-wtvy.onrender.com/${video.id}?action=thumbs-up`
      )
        .then((response) => response.json())
        .then((data) => {
          updateVideoRating(video.id, data.rating);
        })
        .catch((error) => console.error(error));
    }
  };

  // Decrease the rating of the video
  const decreaseRating = () => {
    if (video) {
      fetch(
        `https://video-server-wtvy.onrender.com/${video.id}?action=thumbs-down`
      )
        .then((response) => response.json())
        .then((data) => {
          updateVideoRating(video.id, data.rating);
        })
        .catch((error) => console.error(error));
    }
  };

  // Delete the video
  const handleDelete = () => {
    if (video) {
      fetch(`https://video-server-wtvy.onrender.com/${video.id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            // Delete successful, call the deleteVideo function to update the video list
            deleteVideo(video.id);
          } else {
            throw new Error("Failed to delete video");
          }
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
          onClick={handleDelete}
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
