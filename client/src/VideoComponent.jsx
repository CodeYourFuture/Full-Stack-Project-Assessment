// import FaTrash from "react-icons/fa";
import Rating from "./Rating";
import React, { useState, useEffect } from "react";
// import moment from "moment";


const VideoComponent = () => {
const [videos, setVideos] = useState([]);
  //  const [filteredVideos, setFilteredVideos] = useState([]);
  //  const [videoList, setVideoList] = useState([]);
   const [sortedVideoList, setSortedVideoList] = useState([]);
  async function fetchData() {
    try {
      const url = "http://localhost:5000/videos";
      const fetchURL = `${url}`;
      // `http://localhost:5000/videos`;
      const response = await fetch(fetchURL );
      if(response.ok){
        console.log(response);
        const data = await response.json();
        console.log(data);
        setVideos(data.videos);
        const sortedList = [...(data.videos)].sort((a, b) => b.rating - a.rating);
        setSortedVideoList(sortedList);
      }
    } catch (error) {
      
      console.log(error);
    }
  }
   

  useEffect(() => {
    fetchData();
    console.log("useEffect");
  }, []);



  const handleRemove = (id) => {
    setVideos(videos.filter((video) => video.id !== id));
  };
  return (
    <div>
      {sortedVideoList.map((video, index) => (
        <div key={index} className="form-card">
          <h3>{video.title}</h3>
          <iframe
            width="560"
            height="315"
            src={video.url.replace("watch?v=", "embed/")}
            title={videos.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <Rating rating={sortedVideoList} />
           <button
                className="remove-button"
                onClick={() => handleRemove(video.id)}
              >Remove
                {/* <FaTrash /> */}
              </button>
          
       
        </div>
      ))}
    </div>
  );
};

export default VideoComponent;
