import React from "react";
import axios from "axios";
import './delete.css'

const DeleteComponent = ({ id, onDeleteHandler }) => {
  const url = `https://beko-video-project-fs-assessment-backend.onrender.com/videos/data/${id}`;

  const deleteVideo = async () => {
    try {
      const res = await axios.delete(url);
      if (res.status === 200) {
        alert("This Video has been deleted successfully");
      } else {
        alert("Video for ID requested is not found");
      }
    } catch (error) {
      console.log(error);
    }
    onDeleteHandler();
  };

  return (
    <div>
      <button className="btn-delete" onClick={deleteVideo}>
        Delete Video
        <span></span>
      </button>
    </div>
  );
};

export default DeleteComponent;
