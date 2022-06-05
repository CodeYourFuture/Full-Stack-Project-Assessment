import React from 'react';
import exampleresponse from "./exampleresponse.json";
import YouTube, { YouTubeProps } from 'react-youtube';

const VideoList = () => {
    const onPlayerReady: YouTubeProps["onReady"] = (event) => {
      // access to player in all event handlers via event.target
      event.target.pauseVideo();
    };

    const opts: YouTubeProps["opts"] = {
      height: "390",
      width: "640",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };
    return (
      <div>
        {exampleresponse.map((a) => (
          <div>
            <p>{a.title} </p>
            <YouTube
              videoId={a.url.split("watch?v=")[1]}
              opts={opts}
              onReady={onPlayerReady}
            />
          </div>
        ))}
      </div>
    );
}
 
export default VideoList;