import React from "react";

function YouTubeEmbed({ url, title }) {
  let urlSource = url.replace("watch?v=", "embed/");

  return (
    <iframe
      title="YouTube video player"
      height={"300"}
      src={urlSource}
      alt={`video ${title}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
    />
  );
}

export default YouTubeEmbed;
