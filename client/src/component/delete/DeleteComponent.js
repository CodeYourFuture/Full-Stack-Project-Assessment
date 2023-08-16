import React from "react";
import axios from "axios";
import './delete.css'

const DeleteComponent = ({ id, onDeleteHandler }) => {

    
  const deleteVideo = async () => {
    const url = `http://127.0.0.1:5000/videos/data/${id}`;
    try {
      const res = await axios.delete(url);
      if (res.status === 200) {
        alert("Video with id has been deleted successfully");
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
