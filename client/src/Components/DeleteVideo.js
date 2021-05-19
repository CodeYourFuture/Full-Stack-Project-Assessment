import React from "react";

const DeleteVideo = ({ deleteVideo, id }) => {

  return (
    <div>
      <button onClick={() => deleteVideo(id)}>Delete Video</button>
    </div>
  );
};

export default DeleteVideo;
