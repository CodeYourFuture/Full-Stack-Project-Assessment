import React, { useState } from "react";

const AddVideo = ({ setClicked, videos, setVideos }) => {
  function useFormState(initialValue) {
    const [state, setState] = useState(initialValue);
    function setEvent(event) {
      setState(event.target.value);
    }
    return [state, setEvent];
  }
  const handleCancelButton = () => {
    setClicked(false);
  };
  const [title, setTitle] = useFormState("");
  const [url, setUrl] = useFormState("");

  function handleSubmit(event) {
    event.preventDefault();
    const newVideo = {
      id: Math.floor(Math.random() * 1000000) + title.length + url.length,
      title: title,
      url: url,
      rating: 0,
    };

    const includesNewVideo = videos.some((video) => video.url === url);
    if (!includesNewVideo) {
      setVideos((previousValue) => previousValue.concat(newVideo));
    } else {
      alert("This video is already in the videos list.");
    }
    fetch("https://humailkhan-assessment-project.herokuapp.com/api/videos/", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(newVideo),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => console.log(response.json()));
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="inputTitle">Title</label>
        <input
          className="input ml-3"
          name="title"
          type="text"
          required=""
          placeholder="Title..."
          id="inputTitle"
          value={title}
          onChange={setTitle}
        />
      </div>
      <div>
        <label htmlFor="inputUrl">URL</label>
        <input
          className="input ml-3"
          name="url"
          type="text"
          required
          placeholder="URL..."
          id="inputUrl"
          value={url}
          onChange={setUrl}
        />
      </div>
      <div>
        <button
          className="btn btn-warning input"
          type="cancel"
          onClick={handleCancelButton}
        >
          Cancel
        </button>
        <button className="btn btn-danger input" type="submit">
          ADD
        </button>
      </div>
    </form>
  );
};

export default AddVideo;
