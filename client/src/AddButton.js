import React from "react";
import Button from "react-bootstrap/Button";

function AddButton({ videos, setVideos }) {
  function handleAdd(e) {
    e.preventDefault();
    let newVideo = {
      id: 323446,
      title: "goonzsquad",
      url: "https://www.youtube.com/watch?v=c9_Z_gd1hj0",
      rating: 123,
    };
    //let videoAdded = videos.push(newVideo);
    //setVideos(videoAdded);

    console.log(videos);
  }

  return (
    <Button variant="danger" onClick={handleAdd}>
      Add Video
    </Button>
  );
}

export default AddButton;
