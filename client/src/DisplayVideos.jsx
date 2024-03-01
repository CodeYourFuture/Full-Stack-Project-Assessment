import React, { useEffect, useState } from "react";
import CardVideo from "./CardVideo";
import ToggleOrderOfVideos from "./ToggleOrderOfVideos";

export default function DisplayVideos({ refreshVideos, setRefreshVideos }) {
  const [videos, setVideos] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        // `http://localhost:4500/video`
        `https://kristinadudnyk-fullstack-project.onrender.com/video`
      );
      const data = await response.json();
      console.log("fetchData in Videos", data);
      setVideos(data);
    } catch (error) {
      console.log("The ERROR occured in fetchData in DisplayVideos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshVideos]);

  return (
    <div>
      <ToggleOrderOfVideos
        refreshVideos={refreshVideos}
        setVideos={setVideos}
      />
      <div className="dispay-video-container">
        {videos.map((video) => (
          <CardVideo
            key={video.id}
            video={video}
            setRefreshVideos={setRefreshVideos}
          />
        ))}
      </div>
    </div>
  );
}