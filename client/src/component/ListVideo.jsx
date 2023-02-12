import React from "react"; //use to array
import CardVideo from "./CardVideo";
import { increasementVote, decreasementVote, deleteVideo } from "./VoteVideo";
import exampleresponse from "../exampleresponse.json";


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