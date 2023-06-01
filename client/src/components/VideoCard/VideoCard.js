import "./VideoCard.css";

const VideoCard = ({ video }) => {
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
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <h1>{video.title}</h1>
      <p>Rating: {video.rating}</p>
      <div className="video_card_controls">
        <img src="/media/icons/thumbs_up.svg" alt="thumb up - like the video" />
        <img
          src="/media/icons/heart_empty.svg"
          alt="empty heart - add to favorites category"
        />
        <img src="/media/icons/trash_can.svg" alt="trash - remove the video" />
        <img
          src="/media/icons/thumbs_down.svg"
          alt="thumb down - dislike the video"
        />
      </div>
    </div>
  );
};

export default VideoCard;
