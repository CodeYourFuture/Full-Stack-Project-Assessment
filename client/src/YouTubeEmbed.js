import React from 'react';

function YouTubeEmbed({video}) {
  const url = video.url.replace("watch?v=", "embed/");
  return (
    <iframe
      key={video.id}
      src={url}
      height={"300"}
      width={"400"}
      title={`youtube videos ${video.title}`}
      alt={`video ${video.title}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
    />
  );
  }
export default YouTubeEmbed