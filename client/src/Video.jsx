import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";

function Video({ info }) {
  const [likeCount, setLikeCount] = useState(info.rating);

  const handleLike = (status, id) => {
    let newRate = likeCount;
    if (status === "like") {
      newRate = newRate + 1;
      setLikeCount(newRate);
    } else {
      newRate = newRate - 1;
      setLikeCount(newRate);
    }
    try {
      axios.put(`https://full-stack-assessment.onrender.com/video/${id}`, {
        newRate,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://full-stack-assessment.onrender.com/video/${id}`
    
      );
      if (response.status === 200) {
        alert("Video has been deleted successfully.");
        window.location.reload();
        // Perform any necessary actions after successful deletion
      } else {
        alert("Failed to delete the video.");
        // Handle the error or provide appropriate feedback
      }
    } catch (err) {
      console.log(err);
      alert("An error occurred while deleting the video.");
      // Handle the error or provide appropriate feedback
    }
  };
  return (
    <div>
      <h6 className="title">{info.title}</h6>
      <iframe
        src={`https://www.youtube.com/embed/${info.url}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      ></iframe>
      <p>rate: {likeCount}</p>

      <div className="d-flex justify-content-evenly align-items-center">
        <div className="d-flex">
          <Button
            variant="secondary"
            onClick={() => handleLike("disLike", info.id)}
            className="mr-2"
          >
            👎
          </Button>
          <Button
            variant="primary"
            onClick={() => handleLike("like", info.id)}
            className="mr-2"
          >
            👍
          </Button>
        </div>
        <Button variant="outline-danger" onClick={() => handleDelete(info.id)}>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default Video;
