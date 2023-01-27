import React, { useState, useEffect } from "react";
import "./App.css";
import Video from "./Video";
import dataVideos from "./exampleresponse.json";
import AddAVideo from "./addAVideo";

function App() {
  const [dataVideo, setDataVideo] = useState(dataVideos);
  const [videoID, setVideoID] = useState(null);
  const deleteVideo = (e) => {
    let videoID = e.target.value;
    setVideoID(videoID);
  };
  useEffect(() => {
    let filteredVideos = dataVideo.filter((video) => {
      return video.id !== videoID;
    });
    setDataVideo(filteredVideos);
  }, [videoID]);
  const [isHidden, setIsHidden] = useState(true);
  const visibleToolbar = () => {
    setIsHidden(!isHidden);
  };
  const [titleValue, steTitleValue] = useState("");
  const titleChange = (e) => {
    console.log(e.target.value);
    steTitleValue(e.target.value);
  };
  const [urlValue, steURLValue] = useState("");
  const urlChange = (e) => {
    console.log(e.target.value);
    steURLValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
    if (titleValue !== "" && urlValue.includes("youtube.com")) {
      let newVideo = {
        id: 0,
        title: titleValue,
        url: urlValue,
        rating: 23,
      };
      setDataVideo([...dataVideo, newVideo]);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>

        <button onClick={visibleToolbar} className="addBtn">
          Add a video
        </button>

        {isHidden ? (
          <></>
        ) : (
          <AddAVideo
            titleValue={titleValue}
            urlValue={urlValue}
            titleChange={titleChange}
            urlChange={urlChange}
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
//this is a test
export default App;
