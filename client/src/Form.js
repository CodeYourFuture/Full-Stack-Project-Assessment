import React, { useState } from "react";
import "./App.css";

const Form = ({ setVideos }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [rating, setRating] = useState(0);

  const submitForm = (e) => {
    e.preventDefault();
    let newVideo = {
      id: Date.now(),
      title: title,
      url: url,
      rating: rating,
    };
    function matchYoutubeUrl(url) {
      var p =
        /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
      if (url.match(p)) {
        return url.match(p)[1];
      }
      return false;
    }

    if (newVideo.title === "") {
      alert("Input valid title");
      return;
    }
    if (matchYoutubeUrl(newVideo.url) === false) {
      alert("Input valid YouTube link");
      return;
    }
    if (!newVideo.rating) {
      alert("Input valid rating")
    }
     else {
      setVideos((current) => current.concat(newVideo));
      setTitle("");
      setUrl("");
      setRating("");
    }
  };
  const cancelForm = (e) => {
    e.preventDefault();
    setTitle("");
    setUrl("");
    setRating("");
  }
  return (
    <div>
      <form className="Form">
        <span>Add video</span>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
        <label>
          Rating
          <input
            type="number"
            value={rating}            
            onChange={(e) => setRating(e.target.value)}
          />
        </label>
        <button onClick={cancelForm}>Cancel</button>
        <button onClick={submitForm}>Add</button>
      </form>
    </div>
  );
};

export default Form;
