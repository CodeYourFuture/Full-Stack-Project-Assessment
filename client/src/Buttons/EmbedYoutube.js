import React from 'react'

const EmbedYoutube = ({video}) => {
  const url = video.url.replace("watch?v=", "embed/");

  return (
    <div>
      <iframe
        height={"300"}
        src={url}
        alt={`video ${video.title}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
        title="youtube video"
      />
    </div>
  );
}

export default EmbedYoutube
