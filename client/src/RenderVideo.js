import React from 'react'

function YouTubeEmbed({video}) {
 const url = video.url.replace("watch?v=", "embed/");
 console.log(url);
  return (
    // eslint-disable-next-line jsx-a11y/iframe-has-title
    <iframe
      height={"300"}
      src={url}
      alt={`video ${video.title}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
    />
  );
}

export default YouTubeEmbed