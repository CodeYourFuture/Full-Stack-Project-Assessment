import React, { useState } from 'react';

const AddVideoForm = ({ setClicked, videos, setVideos }) => {
  function useFormState(initialState) {
    const [state, setState] = useState(initialState);
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
  // Set the title and url value to the form input 
  function handleSubmit (event) {
    event.preventDefault();
    const newVideo = {
      id: Math.floor(Math.random() * 10000) + title.length + url.length, // create a random id for front-end key value
      title: title,
      url: url,
      rating: 0
    }
    const videosIncludeNewVideo = videos.some((vid) => vid.url === url);
    if(!videosIncludeNewVideo) {
      setVideos((prev) => prev.concat(newVideo));
    }else {
      alert('This video is already in the videos list.');
    }
    
    fetch("https://omer-cyf-video-recommendation.herokuapp.com", {
      method: "POST",
      body: JSON.stringify(newVideo),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => console.log(response));
  }
    return (
      <form
        onSubmit={handleSubmit}
        // action="https://omer-cyf-video-recommendation.herokuapp.com"
        // method="POST"
      >
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
}

export default AddVideoForm
