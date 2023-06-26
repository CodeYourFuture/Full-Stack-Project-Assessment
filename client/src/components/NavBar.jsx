import React, { useState } from "react";
import "./NavBar.css";

const ValidInputCheck = (title, url) => {
  const hasCorrectTitle = typeof title === "string" && title.trim() !== "";
  const hasCorrectUrl =
    typeof url === "string" &&
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}$/.test(
      url
    );
  return hasCorrectTitle && hasCorrectUrl;
};


function NavBar({ onAddVideo, videoList }) {

      const [title, setTitle] = useState("");
      const [url, setUrl] = useState("");
      const [error, setError] = useState("");


        const TitleClickHandeler = (event) => {
          setTitle(event.target.value);
        };

        const UrlClickHandeler = (event) => {
          setUrl(event.target.value);
        };

        const AddClickHandeler = () => {
          if (!ValidInputCheck(title, url)) {
            setError("Please enter a valid Title and Url.");
            return;
          }
          const videoCode = url.split("v=")[1];
          const newVideo = {
            id: Math.floor(Math.random() * 100000),
            title: title.trim(),
            url: videoCode,
            rating: 0,
          };


    fetch("http://localhost:5000/videos", {
       method: "POST",
       headers: {
        "Content-Type": "application/json",
                },
       body: JSON.stringify(newVideo),
              })

        .then((response) => response.json())
        .then((data) => {    
          onAddVideo(newVideo);
          setTitle("");
          setUrl("");
          setError("");
        })
        .catch((error) => console.log(error));
    };


  return (
    <div className="navbar">
      <div className="navbar-input">
        <label htmlFor="titleInput">Title</label>
        <input
          placeholder="Enter the Title"
          id="titleInput"
          type="text"
          value={title}
          onChange={TitleClickHandeler}
          required
        />
      </div>

      <div className="navbar-input">
        <label htmlFor="urlInput">URL</label>
        <input
          placeholder="Enter the Url"
          id="urlInput"
          type="text"
          value={url}
          onChange={UrlClickHandeler}
          required
        />
      </div>

      <button className="addbtn" onClick={AddClickHandeler}>ADD</button>

      {error && <div>{error}</div>}
    </div>
  );
}

export default NavBar;
