import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Buttons from "./Buttons";

function Video({ embedId }) {
  const [videoId, setVideoId] = useState(embedId);

  useEffect(() => {
    if (videoId.match("http://(www.)?youtube|youtu.be")) {
      let vID = videoId.split("embed/")[1].split(/[?&]/)[0];
      setVideoId(vID);
    }
  }, [<Buttons />]);

  // http://www.youtube.com/watch?v=JcjoGn6FLwI&asdasd
  // https://www.youtube.com/embed/o1-Iddifryw
  // o1-Iddifryw

  return (
    <div>
      <div className="video-responsive">
        <iframe
          width="360"
          height="315"
          src={videoId}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
    </div>
  );
}

Video.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default Video;
