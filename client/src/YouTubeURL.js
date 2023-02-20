import React from "react";

function YouTubeURL({ video }) {
  const url = video.url.replace("watch?v=", "embed/");
  console.log(url);
  return (
    <iframe
      title="YouTube video player"
      height={"300"}
      src={url}
      alt={`video ${video.title}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
    />
  );
}

export default YouTubeURL;
