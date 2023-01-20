import React, { useState }  from "react";
 
import DeleteB from "./DeleteB";
import DislikeB from "./DislikeB";
import LikeB from "./LikeB";

import dataVideos from "./exampleresponse.json";
import RenderVideo from "./RenderVideo";
import "bootstrap/dist/css/bootstrap.css";
// import { Container } from "react-bootstrap";
// import Container from "react-bootstrap/Button";


function Video({ video, ratingFromData  }) {
   const [rating, setRating] = useState(ratingFromData);
   function handleIncrement() {
     setRating((prev) => prev + 1);
   }
   function handleDecrement() {
     if (rating !== 0) {
       setRating((prev) => prev - 1);
     }
   }
  
   const [videos, setVideos] = useState(dataVideos);

   const removeVideo = (id) => {
     const filteredVideos = videos.filter((vid) => {
       return vid.id !== id;
     });
     setVideos(filteredVideos);
   };

  return (
    <div>
      <div className="video-container  shadow p-3 mb-5 bg-white rounded rounded">
        <p className="mb-2">{video.title}</p>
        <RenderVideo video={video} />
        <div className="vote-container">
          <LikeB handleIncrement={handleIncrement} />
          {/* <p className="mt-4">{video.rating}</p> */}
          <p className="mt-4">
            {/* {video.rating} */}
            rating: {video.rating}
          </p>
          <DislikeB handleDecrement={handleDecrement} />
          <DeleteB removeVideo={removeVideo} />
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