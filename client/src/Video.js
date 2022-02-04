import React, { useState } from "react";

const Video = (props) => {
  const [deleteVideo, setDeleteVideo ] = useState(props.videoData.sort((a,b) => b.rating - a.rating, 0));
  const [upVote, setUpVote] = useState(0);
  const [downVote, setDownVote] = useState(0);
  const [selectedId, setSelectedId] = useState(false);

  const handleDeleteVideo = (id) => {
      setDeleteVideo(deleteVideo.filter(video => video.id !== id));
  }

  const handleUpVote = (id) => {
    setSelectedId(true);
    setUpVote(upVote + 1);
    
  }

  const handleDownVote = (id) => {
    setDownVote(downVote - 1);
  }
    
    return (
      <div className="videosContainer">
        {deleteVideo.map((video, index) => (
          <div className="video">
            <p className="hideDate">This video was uploaded on {props.date}</p>
            <div className="topBtnDisplay">
              <button
                key={index + 1}
                className="upBtn"
                onClick={() => handleUpVote(video.id)}
              >
                Up Vote
              </button>
              {selectedId ? (
                <button key={index + 2} className="ratingBtn">
                  {video.rating + upVote + downVote}
                </button>
              ) : (
                <button key={index + 2} className="ratingBtn">
                  {video.rating}
                </button>
              )}
              <button
                key={index + 3}
                className="downBtn"
                onClick={() => handleDownVote(video.id)}
              >
                Down Vote
              </button>
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