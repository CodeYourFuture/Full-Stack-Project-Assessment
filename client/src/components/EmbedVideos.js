import React from "react";
import NewVideos from "./NewVideos";
const EmbedVideos = (lik) => {
  return (
    <div>
      <h2>learn sql fro biggener</h2>
      <iframe
        width="480"
        height="315"
        src="https://www.youtube.com/embed/T8mqZZ0r-RA"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe><br/>
      <button               className="btn btn-primary">Dislike</button>
      {<NewVideos />}
    </div>
  );

};
export default EmbedVideos;
