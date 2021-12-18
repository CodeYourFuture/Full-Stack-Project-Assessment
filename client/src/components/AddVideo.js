import React, { useState } from "react";

const AddVideo = (prop) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const [clicked, setClicked] = useState(false);

  const handleChange = (e) => {
    if (e) {
      if (e.target.name === "title") {
        setTitle(e.target.value);
      } else if (e.target.name === "url") {
        setUrl(e.target.value);
      }
    }
  };

  const handleClick = () => {
    setClicked(true);
  };
  const cancelAdd = () => {
    document.getElementById("addvideoform").reset();
    setClicked(false);
  };

  const addVideo = (e) => {
    let date = new Date().toLocaleDateString("en-GB");
    let time = new Date().toLocaleTimeString({ timeZone: "UTC" });
    e.preventDefault();
    fetch("https://shrouded-spire-27599.herokuapp.com/", {
      
      method: "POST",

      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",

        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({ title: title, url: url, date: date, time: time }),
    })
      .then((res) => res.json())
      .then((newVideos) => {
        if (newVideos.data) {
          prop.input(newVideos.data, 0);
          window.alert(newVideos.message);
        } else {
          console.log(newVideos.id);
          prop.input(
            [
              {
                id: newVideos.id,
                title: title,
                url: url,
                rating: 0,
               
              },
            ],
            newVideos.id
          );
        }
      });
  };

  return (
    <>
      <button className="add" onClick={() => handleClick()}>
        Add Video
      </button>
      <form
        style={{ display: clicked ? "flex" : "none" }}
        className="addvideo-form"
        id="addvideoform"
      >
        <div className="addvideo">
          <label htmlFor="title" name="title">
            Title:
            <input
              className="input"
              type="text"
              name="title"
              required
              onChange={(e) => handleChange(e)}
            />
          </label>
        </div>
        <div className="addvideo">
          <label htmlFor="url" name="url">
            {" "}
            URL:
            <input
              className="input"
              type="url"
              name="url"
              required
              onChange={(e) => handleChange(e)}
            />
          </label>
        </div>

        <div className="addvideo">
          <button
            type="submit"
            onClick={(e) => {
              addVideo(e);
            }}
          >
            Add Video
          </button>

          <button onClick={(e) => cancelAdd()}>Cancel </button>
        </div>
      </form>{" "}
    </>
  );
};

export default AddVideo;
