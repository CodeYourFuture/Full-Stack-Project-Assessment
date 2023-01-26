import React, { Fragment, useState, useEffect } from "react";


import SearchBar from "./SearchBar";
import Buttons from "./Buttons";
import Votes from "./Votes";
import Video from "./Video";

import "../App.css";


function Main() {
  const [wordEntered, setWordEntered] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [rating, setRating] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [response, setResponse] = useState([]); // all videos

  const getAllVideos = async () => {
    try {
      const response = await fetch("http://localhost:5000/videos");
      const jsonData = await response.json();
      console.log(jsonData);
      setResponse(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getAllVideos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newData = {
        title,
        url,
        rating: rating ? rating : 0,
      };

      const response = await fetch("http://localhost:5000/videos", {
        method: "POST",
        // mode: "cors",
        body: JSON.stringify(newData),
        headers: {
          "Content-type": "application/json",
        },
      });

      setTitle("");
      setUrl("");
      setRating("");

      window.location = "/";

      console.log(response);
      console.log("Enviou");
      console.log(newData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const deleteVideo = await fetch(`http://localhost:5000/videos/${id}`, {
        method: "DELETE",
      });

      setResponse(response.filter((video) => video.id !== id));
      console.log(deleteVideo);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Fragment>
      <div className="add-video-and-search">
        <div className="add-video">
          <a
            onClick={() => setShowForm(!showForm)}
            className="dropdown"
            href="#0"
          >
            Add Video
          </a>
          {showForm && (
            <form className="form" onSubmit={handleSubmit}>
              <label>
                Title
                <input
                  className="input"
                  name="title"
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  required
                />
              </label>
              <label>
                URL
                <input
                  className="input"
                  name="vUrl"
                  type="text"
                  onChange={(e) => setUrl(e.target.value)}
                  value={url}
                  required
                />
              </label>
              <label>
                Rating
                <input
                  className="input"
                  name="rating"
                  type="number"
                  onChange={(e) => setRating(e.target.value)}
                  value={rating}
                />
              </label>
              <Buttons setTitle={setTitle} setUrl={setUrl} />
            </form>
          )}
        </div>
        <SearchBar wordEntered={wordEntered} setWordEntered={setWordEntered} />
      </div>
      <div className="videos row">
        {response
          .filter((val) => {
            if (wordEntered === "") {
              return val;
            } else if (
              val.title.toLowerCase().includes(wordEntered.toLowerCase())
            ) {
              return val;
            }
            return null;
          })
          .map((item, key) => {
            return (
              <div className="col-md-4 pb-2 mb-5" key={item.id}>
                <h5>{item.title}</h5>
                <Votes rating={item.rating} />
                <div className="video">
                <Video urlVideo={item.url}/>
                  <button
                    type="button"
                    className="removeVideo btn btn-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </Fragment>
  );
}

export default Main;