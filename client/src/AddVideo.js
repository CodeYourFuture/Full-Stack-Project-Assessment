
import React, { useState } from "react";


const AddVideo = ({ onAddVideo }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleAddVideo = () => {
    onAddVideo({ title, url });
    setTitle("");
    setUrl("");
  };

  return (
    <div className="add-video">
      <h3>Add a Video</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleAddVideo}>Add Video</button>
    </div>
  );
};

export default AddVideo;
