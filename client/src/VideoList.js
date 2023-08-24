// VideoList.js

import React from "react";
import Video from "./Video";

function VideoList(props) {
  // function to get Title from youtube video
  // Util function to get title from URL
  // function getTitleFromUrl(videoUrl) {
  //   const endpoint = `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoUrl}`;

  //   return new Promise((resolve, reject) => {
  //     fetch(endpoint)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         resolve(data.title);
  //       })
  //       .catch((err) => {
  //         reject(err);
  //       });
  //   });
  // }
  // console.log("get title function = " + getTitleFromUrl(props.url));
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
      {props.videos.map((video) => (
        <Video key={video.id} id={video.id} title={video.title} url={video.url} rating={video.rating} onVote={props.onVote} onDelete={props.onDelete} />
      ))}
    </div>
  );
}

export default VideoList;
