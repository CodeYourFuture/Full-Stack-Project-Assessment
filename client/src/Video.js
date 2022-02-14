import React, { useState } from "react";
//import UpVote from "./upVote";
//import DownVote from './downVote';
import Vote from './vote';

const Video = (props) => {
  const [deleteVideo, setDeleteVideo ] = useState(props.videoData.sort((a,b) => b.rating - a.rating, 0));

  const handleDeleteVideo = (id) => {
      setDeleteVideo(deleteVideo.filter(video => video.id !== id));
  }
    
    return (
      <div className="videosContainer">
        {deleteVideo.map((video, index) => (
          <div className="video">
            <p className="hideDate">This video was uploaded on {props.date}</p>
            <div className="topBtnDisplay">
              {/* <UpVote key={index + 1} video={video} /> */}
              <Vote key={index + 3} video={video} />
              {/* <DownVote key={index + 3} video={video} /> */}
            </div>
            <iframe
              key={index + 4}
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${video.url.split('=')[1]}`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button
              key={index + 5}
              className="deleteBtn bg-danger text-white"
              onClick={() => {
                handleDeleteVideo(video.id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    );
}

export default Video;