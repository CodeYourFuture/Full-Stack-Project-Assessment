import React, { useState } from "react";
import "./SubmitVideo.css";

const SubmitVideo = ({ data, setData, rating, setRating }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [showAddVideo, setShowAddVideo] = useState(false);
  const [isButtonVisible, setButtonVisibility] = useState(true);

  const isValidYouTubeUrl = (url) => {
    const regExp =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return regExp.test(url);
  };

  const addVideo = (e) => {
    e.preventDefault();
    let newVideo = {
      //id: Date.now(),
      title: title,
      url: url,
      rating: rating,
    };
    let tempData = [...data, newVideo];
    //console.log(tempData);
    if (newVideo.title === "") {
      alert("Please enter a valid title");
    }
    if (newVideo.url === "") {
      alert("Please enter a valid url");
    } else if (!isValidYouTubeUrl(newVideo.url)) {
      alert("Please enter a valid url");
    } else {
      fetch("/videos", {
        method: "POST",
        body: JSON.stringify(newVideo),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(err));

      setData(tempData);
      setTitle("");
      setUrl("");
    }
  };

  const toggleAddVideo = () => {
    setShowAddVideo(true);
    setButtonVisibility(!isButtonVisible);
  };
  const hideAddVideo = () => {
    setShowAddVideo(!showAddVideo);
    setButtonVisibility(true);
  };
  return (
    <div className="">
      <button className="buttons btn" onClick={toggleAddVideo}>
        Add Video
      </button>
      {showAddVideo ? (
        <form className="Add-form">
          <label htmlFor="title" className="labels">
            Title
            <input
              type="text"
              name="title"
              placeholder=" Video title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
            />
          </label>
          <label className="labels" htmlFor="link">
            URL
            <input
              type="text"
              name="link"
              placeholder=" Enter URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="input"
            />
          </label>
          <div>
            <button className="buttons btn-add" type="submit" onClick={addVideo}>
              Add
            </button>
            <button className="buttons btn-add" onClick={hideAddVideo}>
              Cancel
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
};

export default SubmitVideo;
