import React, { useState } from "react";

const AddVideo = (prop) => {
 // let g = prop.video;
  const [title, settitle] = useState("");
  const [url, setUrl] = useState("");

  const [clicked, setClicked] = useState(false);
  //const [newvideo, setNewVideo] = useState([{}]);
 
  const handleChange = (e) => {
    if (e) {
      if (e.target.name === "title") {
        settitle(e.target.value);
      } else if (e.target.name === "url") {
        setUrl(e.target.value);
      }
    }

    
  };
  const handleClick = () => {
    setClicked(true);
  };
  const handleDelete = () => {
    document.getElementById("addvideoform").reset();
    setClicked(false);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:5000/", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({ title: title, url: url }),
    })
      .then((res) => res.json())
      .then((newVideos) => {
        if (newVideos.data) {
          prop.input(newVideos.data,0);
          window.alert(newVideos.message);
        } else {
          prop.input([{ id: newVideos, title: title, url: url, rating: 0 }],newVideos);
        }
      });
  };

  return (
    <>
      <h2 className="addVideo" onClick={() => handleClick()}>
        Add Video
      </h2>
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
              handleAdd(e);
            }}
          >
            Add Video
          </button>
         
          <button onClick={(e) => handleDelete()}>Delete</button>
        </div>
      </form>{" "}
    </>
  );
};

export default AddVideo;
