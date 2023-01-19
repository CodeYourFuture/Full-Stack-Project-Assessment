import React  from "react";
 
import DeleteB from "./DeleteB";
import DislikeB from "./DislikeB";
import LikeB from "./LikeB";

import RenderVideo from "./RenderVideo";
import "bootstrap/dist/css/bootstrap.css";
// import { Container } from "react-bootstrap";
// import Container from "react-bootstrap/Button";


function Video({ video }) {
    

  return (
    <div>
      <div className="video-container">
        <p>{video.title}</p>
        <RenderVideo video={video} />
        <div className="vote-container">
          <LikeB />
          <p className="mt-4">{video.rating}</p>
          <DislikeB />
          <DeleteB />
          {/* <p>{video.rating}</p> */}
        </div>
      </div>
    </div>
  );
}

export default Video;

//  <Row xs={1} sm={2} md={3} className="mt-3">
//    {dataVideos.map((video, key) => (
//      <Video video={video} key={key} />
//    ))}
//  </Row>;