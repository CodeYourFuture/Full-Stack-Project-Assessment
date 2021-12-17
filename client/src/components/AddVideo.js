import React, { useState } from "react";
const AddVideo = ({ setVideos }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newVideo = {
      title: title,
      url: url,
    };

    fetch("http://localhost:5000/", {
      method: "POST",
      body: JSON.stringify(newVideo),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((response) => {
        console.log(response);
        setVideos((data) => data.concat(newVideo));
      })
      .catch((error) => console.error(error));
  };
  return (
    <div>
      <form className="addVideo" onSubmit={handleSubmit}>
        <input
          type="text"
          className="inputTitle"
          name="title"
          placeholder="Enter Title Here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          className="inputUrl"
          name="url"
          placeholder="Enter URL Here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit" className="add-btn">
          Add Video
        </button>
      </form>
    </div>
  );
};
export default AddVideo;
