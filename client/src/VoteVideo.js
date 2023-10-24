import React from 'react'

function YouTubeEmbed({video}) {
 const url = video.url.replace("watch?v=", "embed/");
 console.log(url);
  return (
    <iframe
      height={"300"}
      src={url}
      alt={`video ${video.titel}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
    />
  );
}

export default YouTubeEmbed