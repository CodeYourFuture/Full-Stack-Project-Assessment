import React, { useState } from "react";

export default function AddVideo({ videosArr, addedVideos }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const addFunction = (title, url) => {
    let newVideo = {
      title: title,
      url: url,
      rating: Math.floor(Math.random() * 10000),
      // date: `${new Date().toLocaleTimeString}`,  // Unable to show the date !
    };
    console.log(newVideo);

    fetch("http://127.0.0.1:5000/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify(newVideo),
    })
      .then((response) => {
        console.log(response);
        let updatedData = videosArr.concat(response);
        console.log(`Added video :${response.title}`);
        // window.location.reload(true); // This fixes the CORS problem. But only because it refreshes the page
        return addedVideos(updatedData);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (title.trim() && url.trim()) {
      addFunction(title, url);
      setTitle("");
      setUrl("");
    }
  };

  const cancelHandler = (e) => {
    setTitle("");
    setUrl("");
  };

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const urlHandler = (e) => {
    setUrl(e.target.value);
  };

  return (
    <div className="add-component">
      <h3 className="form-heading">Add Video</h3>
      <form className="form" onSubmit={submitHandler}>
        <div className="form-group">
          <label className="form-label" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Add video title.."
            value={title}
            onChange={titleHandler}
          ></input>
        </div>
        {/* <br /> */}
        <div className="form-group">
          <label className="form-label" htmlFor="URL">
            URL
          </label>
          <input
            type="url"
            name="url"
            placeholder="Add URL.."
            value={url}
            onChange={urlHandler}
          ></input>
        </div>
        <div className="buttons">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={submitHandler}
          >
            Add Video
          </button>
          <button
            type="button"
            className="btn btn-warning"
            onClick={cancelHandler}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
