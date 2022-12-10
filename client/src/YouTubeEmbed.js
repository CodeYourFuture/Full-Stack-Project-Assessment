import React from "react";

function YouTubeEmbed({ url, title }) {
  let urlSource = url.replace("watch?v=", "embed/");
  console.log(url);
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
