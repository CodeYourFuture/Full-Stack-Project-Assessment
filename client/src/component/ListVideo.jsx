import React, { useState } from "react"; //use to array
import CardVideo from "./CardVideo";
import { increasementVote, decreasementVote, deleteVideo } from "./VoteVideo";
import exampleresponse from "../exampleresponse.json";


export default function ListVideo() {
  const [videosYoutube, setVideosYoutube] = useState(exampleresponse);

  videosYoutube.sort((a, b) => b.rating - a.rating);

  return (
    <div className="container-list-videos">
      {videosYoutube.map((video) => (
        <CardVideo
          key={video.id}
          video={video}
          increasementVote={(id) => {
            increasementVote(setVideosYoutube, videosYoutube, id);
          }}
          decreasementVote={(id) => {
            decreasementVote(setVideosYoutube, videosYoutube, id);
          }}
          deleteVideo={(id) => {
            deleteVideo(setVideosYoutube, id);
          }}
        />
      ))}
    </div>
  );
}
