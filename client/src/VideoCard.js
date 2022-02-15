import React from "react";
import "./VideoCard.css"

const VideoCard = (props) => {

    const idLength = 11;
    const videoId = props.video.url.split("").splice(-idLength).join("");

    const uploadedDate = props.video.date
      ? new Date(props.video.date).toLocaleDateString()
      : "unknown date";

    const handleLike = () => {
        props.addVote(props.video.id);
    }

    const handleDislike = () => {
      props.removeVote(props.video.id);
    }

    const handleDelete = () => {
      props.deleteVideo(props.video.id)
    }
    
    return (
      <div className="VideoCard">
        <h1 className="Title">{props.video.title}</h1>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <p>Video uploaded on {uploadedDate}</p>
        <div className="LikeSection">
          <div className="Like" onClick={handleLike}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Thumb_up_icon_2.svg/1200px-Thumb_up_icon_2.svg.png"
              alt="thumbs up icon"
            />
            <p className="Votes">{props.video.rating}</p>
          </div>
          <div className="Dislike" onClick={handleDislike}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/25/25395.png"
              alt="thumbs up icon"
            />
          </div>
        </div>
        <button className="DeleteBtn" onClick={handleDelete}>Remove Video</button>
      </div>
    );
}

export default VideoCard;