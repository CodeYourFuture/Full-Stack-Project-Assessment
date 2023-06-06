import "./main.scss";
// import Data from "../../data/exampleresponse.json";
import VideoCard from "./VideoCard";
import AddVideo from "./AddVideo";
import { useState, useEffect } from "react";

const Videos = () => {
  const [videosData, setVideoData] = useState([]);

  // const addVideo = (formValue) => {
  //   setVideoData([...videosData, formValue]);
  // };

  useEffect(() => {
    async function fetchData() {
      console.log("hello");
      try {
        const response = await fetch("http://localhost:5000");
        const data = await response.json();
        setVideoData(data.video);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const addVideo = async (input) => {
    try {
      const response = await fetch("http://localhost:5000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const data = await response.json();

      if (data.result) {
        setVideoData(data.video);
      } else {
      }
    } catch {}
  };

  const deleteHandler = (videoID) => {
    console.log(videoID);
    fetch(`http://localhost:5000/${videoID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setVideoData(data.video));
  };

  return (
    <div className="main_container grid">
      <AddVideo addVideo={addVideo} />
      <div className="videos_container grid">
        {videosData.map((video) => (
          <VideoCard video={video} deleteHandler={deleteHandler} />
        ))}
      </div>
    </div>
  );
};

export default Videos;
