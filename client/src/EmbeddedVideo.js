import React from "react";

function EmbeddedVideo({ video }) {
  let url;
  if (video.url) {
    url = video.url.replace("watch?v=", "embed/");
  }
  return (
    <iframe
      className="embeddedVideo"
      title={video.title}
      height={"300"}
      src={url}
      alt={video.title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
    />
  );
}

export default EmbeddedVideo;
