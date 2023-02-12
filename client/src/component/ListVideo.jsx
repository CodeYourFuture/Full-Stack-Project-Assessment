import React from "react"; //use to array
import CardVideo from "./CardVideo";

export default function ListVideo({videosYoutube, deleteVideo}) {
  videosYoutube.sort((a, b) => b.rating - a.rating);

  return (
    <div className="container-list-videos">
      {videosYoutube.map((video) => (
        <CardVideo
          key={video.id}
          video={video}
          deleteVideo={deleteVideo}
        />
      ))}
    </div>
  );
}