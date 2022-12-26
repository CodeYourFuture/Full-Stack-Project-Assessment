import React from 'react'

function YouTubeEmbed({ video }) {
  const url = video.link.replace("watch?v=", "embed/");

  return (
    <iframe
      height={"190"}
      src={url}
      alt={`video ${video.title}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
      className='rounded'
      title={video.title}
    />
  );
}

export default YouTubeEmbed