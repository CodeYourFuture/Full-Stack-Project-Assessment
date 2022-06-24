import React from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import Rating from "./Rating";

const VideoList = (props) => {
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };
  // for more information and setting go to
  // https://www.npmjs.com/package/react-youtube
  const opts: YouTubeProps["opts"] = {
    width: "100%",

    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const sortedData = props.filterData.sort((a, b) => b.rating - a.rating);
  const deleteHandler = (videoId) => {
    fetch(
      `https://cyf-fullstack-alirezabg.herokuapp.com/videos/delete/${videoId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data1) => {
        console.log("Success:", data1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (props.loading) {
    return <h3>Loading...</h3>;
  } else {
    return (
      <div className="video-class">
        {sortedData.map((video) => (
          <div className="video-class">
            <p>{video.title} </p>
            <div>
              <Rating rating={video.rating} ratingId={video.id} />
            </div>
            <YouTube
              className="video-class"
              videoId={video.url.split("watch?v=")[1]}
              opts={opts}
              onReady={onPlayerReady}
            />
            <button
              className="delete-button"
              onClick={(e) => deleteHandler(video.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    );
  }
};

export default VideoList;
