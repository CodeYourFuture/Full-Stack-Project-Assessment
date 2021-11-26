import React from 'react';

const VideoCard = ({videoData}) => {
  //console.log(videos);
    return (
      <div className="App">
        {videoData.map((video) => {
        //console.log(video);
        return (
          <div key={video.id}>
          <p>{video.title}</p>
          <iframe width="560" height="315" src={`https://www.youtube.com/embed/${video.url.slice(32)}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
        )
        })}
        hello there!!!
      </div>
    );
  }

export default VideoCard;
