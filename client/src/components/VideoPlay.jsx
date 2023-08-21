import React, { useState } from "react";
import AddVideo from "./AddVideo";
import exampleresponse from "../exampleresponse.json";

function VideoPlay() {
  const [vid, setVid] = useState(exampleresponse);

  //const voteIncrease = () => {
  //     setVote((prev) => prev + 1);
  //   };

  //   const voteDecrease = () => {
  //     setVote((prev) => (prev > 0 ? prev - 1 : 0));
  //   };

  const updateVoteCount = (videoId, value) => {
    setVid((prevVid) =>
      prevVid.map((video) => (video.id === videoId ? { ...video, votes: (video.votes || 0) + value } : video))
    );
  };

  const newVideoAdd = (newInput) => {
    const newId = vid.length + 1;
    newInput.id = newId;
    newInput.votes = 0;
    setVid([...vid, newInput]);
  };

  const deleteVideo = (videoId) => {
    const videoDeleted = vid.filter((el) => el.id !== videoId);
    setVid(videoDeleted);
  };

  let date = new Date().toDateString();

  let sortedVideos = [...vid].sort((a, b) => b.votes - a.votes);
  return (
    <div className="container mt-5">
      <AddVideo onVidAdd={newVideoAdd} />
      {sortedVideos.map((el, index) => {
        const videoId = getVideoIdFromUrl(el.url);
        return (


          <div className="cardContainer">
            <div className="videoCard" key={index}>
              <h5 className="card-title">{el.title}</h5>
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <p>requested at :{date}</p>

              <div className="btnCounter">
                <button onClick={() => updateVoteCount(el.id, 1)} type="button" className="btn btn-success">
                  +
                </button>
                <p>Vote: {el.votes}</p>
                <button onClick={() => updateVoteCount(el.id, -1)} type="button" className="btn btn-danger">
                  -
                </button>
                <button onClick={() => deleteVideo(el.id)} type="button" className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function getVideoIdFromUrl(url) {
  const videoId = url.split("v=")[1];
  return videoId;
}

export default VideoPlay;
