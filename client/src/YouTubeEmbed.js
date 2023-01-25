import React from "react";

function YouTubeEmbed({ url, title, setUrl }) {
  let urlSource = url?.replace("watch?v=", "embed/");

  // console.log(urlSource);

  return (
    <iframe
      title="YouTube video player"
      height={"300"}
      src={urlSource}
      alt={`video ${title}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      // allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
    />
  );
}

export default YouTubeEmbed;
