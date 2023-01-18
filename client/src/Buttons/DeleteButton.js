import React from "react";

export default function DeleteButton({ videos,setVideos}) {
  function handleClearVideos() {
    const newVideos = videos.filter((todo) => !todo.complete);
    setVideos(newVideos);
  }
  return (
    <div>
      <button className="btn btn-danger" onClick={handleClearVideos}> Delete</button>
    </div>
  );
}
