import React from 'react'


function YouTubeEmbed({video}) {
 const url = video.url.replace("watch?v=", "embed/");
  return (
    <iframe
      title={"video"}
      rating={"rating"}
      width={"350"}
      height={"200"}
      src={url}
      padding={"1em"}
      alt={`video ${video.title}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
    />
  );
}


export default YouTubeEmbed
