import { useState, useEffect } from "react";
import AddVideo from "./AddVideo";
import SearchVideo from "./SearchVideo";
import VideoCard from "./VideoCard";
import "../App.css";

const VideoDisplay = (prop) => {
  const [allvideos, setAllVideos] = useState([]);

  const [searched, setsearchedVideos] = useState([]);

  const inputVideo = (newvideo, id) => {
    if (id === 0) setAllVideos(newvideo);
    else {
      setAllVideos([...allvideos].concat(newvideo));
    }
  };
  useEffect(() => {
    let o;
    if (prop.order === true) o = "asc";
    else {
      o = "";
    }
    fetch(`https://shrouded-spire-27599.herokuapp.com/?order=${o}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setAllVideos(data);
          setsearchedVideos(data);
        }
      })
      .catch((e) => console.log(e));
  }, [prop.order]);
  const onsearch = (videoSearch) => {
    setAllVideos(videoSearch);
  };

  return (
    <div className="render">
      <div>
        <AddVideo input={inputVideo} video={allvideos} />
        <SearchVideo videos={searched} onsearch={onsearch} />
      </div>{" "}
      <div className="videos">
        {[...allvideos].map((videos, index) => {
          return <VideoCard videos={videos} />;
        })}
      </div>
    </div>
  );
};

export default VideoDisplay;
