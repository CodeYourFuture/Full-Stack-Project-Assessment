import React from "react";

export default function Video(props) {
  return (
    <div>
      {props.videosData.map((video) => (
        <div>
          <button>{video.rating}</button>
          <div className="thumbs">
            <i class="fas fa-thumbs-up"></i>
            <i class="fas fa-thumbs-down"></i>
          </div>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/{FUeyrEN14Rk}"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <button>Delete Video</button>
        </div>
      ))}
    </div>
  );
}
