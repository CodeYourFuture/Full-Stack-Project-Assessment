import { useState, React } from "react";
import "./AddVideo.css";

export const AddVideo = ({ videos, setVideos }) => {
  const [clickAdd, setClickAdd] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [urlInput, setUrlInput] = useState("");

  const handleAddVideoButton = () => {
    clickAdd === false ? setClickAdd(true) : setClickAdd(false);
  };

  const handleTitleInputChange = (e) => {
    e.preventDefault();
    setTitleInput(e.target.value);
  };

  const handleUrlInputChange = (e) => {
    e.preventDefault();
    let url = e.target.value;
    if (url.includes("https://www.youtube.com/watch?v=")) {
      url = url.replace("watch?v=", "embed/");
      return setUrlInput(url);
    } else {
      alert("Invalid URL format. Please provide a YouTube URL");
    }
  };

  const handleFormSubmit = () => {
    const videoId = Math.floor(Math.random() * 1000000);
    const videoRating = Math.floor(Math.random() * 10000);
    let newVideo = {};
    newVideo = {
      id: videoId,
      rating: videoRating,
      title: titleInput,
      url: urlInput,
    };
    setVideos((videos) => [...videos, newVideo]);

    setTitleInput("");
    setUrlInput("");
  };

  console.log(titleInput);
  console.log(urlInput);

  return (
    <div>
      <a href="#" alt="Add video button" onClick={handleAddVideoButton}>
        Add video
      </a>
      {clickAdd === true ? (
        <form onSubmit={handleFormSubmit}>
          <label>
            Title
            <input
              type="text"
              value={titleInput}
              onChange={handleTitleInputChange}
              name="title"
              required
            />
          </label>
          <label>
            URL
            <input
              type="text"
              value={urlInput}
              onChange={handleUrlInputChange}
              name="url"
              required
            />
            <input id="submitBtn" type="submit" />
          </label>
        </form>
      ) : null}
    </div>
  );
};
