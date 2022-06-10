import React, { useState } from "react";

const AddNewVideo = (props) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

   const handleSubmit = (event) => {
     event.preventDefault();
     //This functions increments each video id 
     const getId = (id) => {
    return id++
  }
      const addVideo = {
        title,
        url,
        id: {getId},
        rating: 5,
      };

      props.setAllVideos((allVideos) => {
        return allVideos.concat(addVideo);
      });
     setTitle("");
     setUrl("");
   };
  
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          URL
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <div className="btn-form">
          <div className = "button1">
        <button
          onClick={() => props.setAddVideo(false)}
          type="cancel"
          className="btn btn-warning"
        >
          Cancel
        </button>
        <button type="add" className="btn btn-danger">
          ADD
        </button>
        </div>
        </div>
      </form>
    </div>
  );
}

export default AddNewVideo;