import React from "react";
import Button from "react-bootstrap/Button";

function DeleteButton({ id, videos, setVideos }) {
  function handleDelete() {
    const filteredVideos = videos.filter((video) => video.id !== id);
    console.log(filteredVideos);
    setVideos(filteredVideos);

    fetch(`https://humailkhan-assessment-project.herokuapp.com/vidoes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((response) => console.log(response.json()));
  }

  return (
    <Button className="del-button" variant="danger" onClick={handleDelete}>
      Delete Video
    </Button>
  );
}

export default DeleteButton;
