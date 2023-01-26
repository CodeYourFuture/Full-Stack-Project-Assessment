import React, { useState } from "react";

const SubmitVideo = ({ data, setData }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [rating, setRating] = useState(0);

  function isValidYouTubeUrl(url) {
    const regExp =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return regExp.test(url);
  }

  const addVideo = (e) => {
    e.preventDefault();
    let newVideo = {
      id: Date.now(),
      title: title,
      url: url,
      rating: rating,
    };
    let tempData = [...data, newVideo];

    if (newVideo.title === "") {
      alert("Please enter a valid title");
    }
    if (newVideo.url === "") {
      alert("Please enter a valid url");
    } else if (!isValidYouTubeUrl(newVideo.url)) {
      alert("Please enter a valid url");
    } else {
      setData(tempData);
    }
    setTitle("");
    setUrl("");
  };
  const cancelAddVideo = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form>
        <h2>Add Video</h2>
        <label>
          Title
          <input
            type="text"
            name="title"
            placeholder=" Video title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          URL
          <input
            type="text"
            name="link"
            placeholder=" Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <div className="buttons">
          <button type="submit" onClick={addVideo}>
            Add
          </button>
          <button onClick={cancelAddVideo}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default SubmitVideo;
