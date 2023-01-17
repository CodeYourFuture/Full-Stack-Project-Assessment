import React from 'react'

function YouTubeEmbed({video}) {
 const url = video.url.replace("watch?v=", "embed/");
 console.log(url);
  return (
    <iframe
      width={"400"}
      height={"200"}
      src={url}
      alt={`video ${video.title}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
    />
  );
}

export default YouTubeEmbed