import { useState } from "react";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa"; 
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";



const SingleVideo = ({ id, title, url, rating, uploadedDate, handleRemove }) => {
 
    const [videoRating, setVideoRating] = useState(rating);
    const link = url.slice(-11);
    const handleLike = () => {
      const newRating = videoRating + 1;
      setVideoRating(newRating);
    };
    const handleDislike = () => {
      if (videoRating > 0) {
        const newRating = videoRating - 1;
        setVideoRating(newRating);
      }
    };
    return (
      <div className="single-video">
        <iframe
          controls
          src={`https://www.youtube.com/embed/${link}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
        <div className="action">
          <div className="uploaded-date">
            <span>{uploadedDate ? uploadedDate : ""}</span>
          </div>
          <div className="title">
            <h5> {title}</h5>
          </div>

          <div className="details">
            <Button
              size="small"
              variant="contained"
              className="delete-btn"
              startIcon={<DeleteIcon/>}
              onClick={() => handleRemove(id)}
            >
              Remove
            </Button>
            <div className="rate">
              <button className="like" onClick={handleLike}>
                <i>
                  <FaRegThumbsUp />
                </i>
              </button>
              <span className="rate-text">{videoRating}</span>
              <button className="dislike" onClick={handleDislike}>
                <i>
                  <FaRegThumbsDown />
                </i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default SingleVideo;
