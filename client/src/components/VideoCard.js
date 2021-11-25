import React from 'react';
import VideoVotes from './VideoVotes'

export default function VideoCard () {
    return (
      <div>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/{VIDEO_ID_GOES_HERE}"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <div className="video-features">
            <h2>title</h2>
            <VideoVotes />
            <button>Delete</button>
        </div>
      </div>
    );
}