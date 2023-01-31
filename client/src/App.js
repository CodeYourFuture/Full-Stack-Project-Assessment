import React from "react";
import "./App.css";
import Video from "./Video";
import AddVideo from "./AddVideo";
import { useState, useEffect } from "react";

function App() {
  const [dataVideo, setDataVideo] = useState([]);
  useEffect(() => {
    fetch("https://video-app-node.onrender.com/videos")
      .then((res) => res.json())
      .then((data) => setDataVideo(data));
  }, []);
  const deleteVideo = (e) => {
    let videoID = Number(e.target.value);
    fetch(`https://video-app-node.onrender.com/video/${videoID}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setDataVideo(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };
  const [isHidden, setIsHidden] = useState(true);
  const visibleToolbar = () => {
    setIsHidden(!isHidden);
  };
  const [titleValue, setTitleValue] = useState("");
  const titleChange = (e) => {
    console.log(e.target.value);
    setTitleValue(e.target.value);
  };
  const [urlValue, setURLValue] = useState("");
  const urlChange = (e) => {
    console.log(e.target.value);
    setURLValue(e.target.value);
  };
  const [ratingValue, setRatingValue] = useState("");
  const ratingChange = (e) => {
    console.log(e.target.value);
    setRatingValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (titleValue !== "" && urlValue.includes("youtube.com")) {
      fetch("https://video-app-node.onrender.com/video", {
        method: "POST",
        body: JSON.stringify({
          title: titleValue,
          url: urlValue,
          rating: ratingValue,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          setDataVideo(data);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        <div>
          <button onClick={visibleToolbar} className="addBtn">
            Add a video
          </button>
        </div>        
        {isHidden ? (
          <></>
        ) : (
          <AddVideo
            titleValue={titleValue}
            urlValue={urlValue}
            titleChange={titleChange}
            urlChange={urlChange}
            ratingValue={ratingValue}
            ratingChange={ratingChange}
            submit={handleSubmit}
          />
        )}
      </header>
      <body>
        {dataVideo.map((video, key) => (
          <Video
            deleteVideo={deleteVideo}
            video={video}
            key={key}
            value={video.id}
          />
        ))}
      </body>
    </div>
  );
}

export default App;
