import React from "react";
import Button from "./Button";

const VideoCard = ({ videoData, setVideoData, singleVideo, onDelete }) => {

  /**
    On the return statement of the map, for the when the condition is true, I need to create the appropriate value that will replace the original value. When the condition is false I can return the video.
   */

  function upVoteHandler() {
    console.log("videoData--->", videoData);
    const likeRating = videoData.map((video) => {
        if (video.id === singleVideo.id) {
          video.rating += 1
        }
        return video;
      });
      setVideoData(likeRating)
    }

  function downVoteHandler() {
    const dislikeRating = videoData.map((video) => {
      if (video.id === singleVideo.id) {
        video.rating -= 1;
      }
      return video;
    });
    setVideoData(dislikeRating);
  }

  return (
    <div>
      <p className="text-xl text-yellow-500 font-semibold text-center">Video Title: {singleVideo.title}</p>
      <iframe
        width="560"
        height="315"
        src={singleVideo.url.replace("watch?v=", "embed/")}
        title={singleVideo.title}
        allowFullScreen
      ></iframe>
      <button type="button" onClick={upVoteHandler}>
        Up Vote 👍
      </button>
      {/* <button type="button" onClick={downVoteHandler}>Down Vote</button> */}
      <p>Rating: {singleVideo.rating}</p>
      <button type="button" onClick={downVoteHandler}>
        Down Vote 👎
      </button>
      <p>Time Uploaded: {singleVideo.timeSent}</p>

      {/* Put onDelete function on line below */}

      <Button onDelete={onDelete} id={singleVideo.id} />
    </div>
  );
};

export default VideoCard;


