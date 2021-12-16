import React from 'react';
import VideoVotes from './VideoVotes';
import DeleteVideo from './DeleteVideo';



export default function VideoCard ( {video, videos, setVideos, fetchData} ) {
  const urlID = video.url.slice(32);

  return (
    <div>
      <iframe
        className="video-embed"
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${urlID}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="video-features">
        <h2 className="video-title">{video.title}</h2>
        <VideoVotes rating={video.rating}/>
        <DeleteVideo
          id={video.id}
          video={video}
          videos={videos}
          setVideos={setVideos}
          fetchData={fetchData}
        />
      </div>
    </div>
  );
}