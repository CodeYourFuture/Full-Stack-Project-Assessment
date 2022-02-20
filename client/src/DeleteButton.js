import React from "react";
//import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap-buttons';

function DeleteButton({ id, videos, setVideos }) {
  function handleDelete() {
    const filteredVideos = videos.filter((video) => video.id !== id);
    console.log(filteredVideos);
    setVideos(filteredVideos);

    fetch(`https://krishan-assessment-project.herokuapp.com/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((response) => console.log(response.json()));
  }

  return (
    <button className="del-button" variant="danger" onClick={handleDelete}>
      Delete Video
    </button>
  );
}

export default DeleteButton;
