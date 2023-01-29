import React from "react";

function EmbeddedVideo({ video }) {
  return (
    <iframe
      className="embeddedVideo"
      title={video.title}
      height={"300"}
      src={video.url.replace("watch?v=", "embed/")}
      alt={video.title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
    />
  );
}

export default EmbeddedVideo;
