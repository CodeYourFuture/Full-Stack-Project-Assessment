import React, { useState, useEffect } from "react";
import "../App.css";
import Video from "./Video";
import axios from "axios";

function VideosContainer() {
  const [videos, setVideos] = useState([]);
  function handleRemoveItem(clickedId) {
    axios.delete(`/api/${clickedId}`).then((res) => {
      console.log(res);
      console.log(res.data);
      axios({
        method: "get",
        url: "/api",
      }).then((response) => {
        setVideos(response.data);
      });
    });
  }

  useEffect(() => {
    axios({
      method: "get",
      url: "/api",
    }).then((response) => {
      setVideos(response.data);
    });
  }, [videos]);

  return (
    <div className="container">
      <ul className="row">
        {videos.map((video) => {
          return (
            <Video
              key={video.id}
              video={video}
              handleClick={handleRemoveItem}
            ></Video>
          );
        })}
      </ul>
    </div>
  );
}

export default VideosContainer;
