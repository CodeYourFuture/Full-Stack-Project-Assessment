import React from "react";
import Voting from "./Votings";
import DeletedVideo from "./DeleteVideo";

export default function VideoCard({ eachVideo, index, handleDeletedVideo }) {
  const { id, rating } = eachVideo;
  //  console.log(id);
  // console.log(rating)
  // console.log(eachVideo)
  return (
    <div key={index} className="videoCard">
      <div>
        <h4 className="title"> {eachVideo.title}</h4>
        <Voting eachVideo={eachVideo} videoRating = {rating} />
        <iframe
          
          src={`https://www.youtube.com/embed/${eachVideo.url.split("v=")[1]}`}
          title="YouTube video player"
          // frameborder="0"
          // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          // allowfullscreen
        ></iframe>
        <DeletedVideo handleDeletedVideo={handleDeletedVideo} videoId={id} />
      </div>
    </div>
  )
}
