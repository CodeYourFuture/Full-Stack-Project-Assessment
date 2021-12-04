import React from "react";
import Button from "react-bootstrap/Button";

function DeleteButton({ id, videos, setVideos }) {
  function handleDelete() {
    const filteredVideos = videos.filter((x) => x.id !== id);
    console.log(filteredVideos);
    setVideos(filteredVideos);
  }

  return (
    <Button variant="danger" onClick={handleDelete}>
      Delete Video
    </Button>
  );
}

export default DeleteButton;
