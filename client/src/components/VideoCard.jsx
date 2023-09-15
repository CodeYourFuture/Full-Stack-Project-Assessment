import React from "react";
import Button from "./Button";
import { baseUrl } from "../config";

const VideoCard = ({ videoData, setVideoData, singleVideo, onDelete }) => {
  /**
    On the return statement of the map, for the when the condition is true, I need to create the appropriate value that will replace the original value. When the condition is false I can return the video.
   */

  function upVoteHandler() {
    const likeRating = videoData.map((video) => {
      if (video.id === singleVideo.id) {
        video.rating += 1;
        fetch(`${baseUrl}/videos/${video.id}`, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(video),
        });
      }
      return video;
    });
    setVideoData(likeRating);
  }

  function downVoteHandler() {
    const dislikeRating = videoData.map((video) => {
      if (video.id === singleVideo.id) {
        video.rating -= 1;
        fetch(`${baseUrl}/videos/${video.id}`, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(video),
        });
      }
      return video;
    });
    setVideoData(dislikeRating);
  }

  return (
    <div className="grid gap-5">
      <p className="text-left text-2xl font-bold">{singleVideo.title}</p>

      <div className="grid-col grid w-fit gap-5">
        <iframe
          width="560"
          height="315"
          src={singleVideo.url.replace("watch?v=", "embed/")}
          title={singleVideo.title}
          allowFullScreen
        ></iframe>

        {/* Rating section below: */}
        <div className="flex flex-row justify-between text-lg font-bold">
          <button type="button" onClick={upVoteHandler}>
            Up Vote 👍
          </button>

          <p>Rating: {singleVideo.rating}</p>

          <button type="button" onClick={downVoteHandler}>
            Down Vote 👎
          </button>
        </div>

        <Button onDelete={onDelete} id={singleVideo.id} />
      </div>

      <p className="text-lg font-bold">Time Uploaded: {singleVideo.timeSent}</p>
    </div>
  );
};

export default VideoCard;
