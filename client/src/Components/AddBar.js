import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

const AddBar = ({ setVideoData, videoData }) => {
  const [videoTitle, setVideoTitle] = useState();
  const [videoURL, setVideoURL] = useState();
  function youTubeGetID(url) {
    url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
  }
  function submitHandler(e) {
    e.preventDefault();
    console.log("submithandler");
    const id = Math.floor(1000000 * Math.random());
    console.log(id);
    const newData = {
      id: id,
      title: videoTitle,
      url: videoURL,
      rating: 76,
      like: 0,
      dislike: 0,
    };

    const videoID = youTubeGetID(newData.url);
    newData.url = `https://www.youtube.com/embed/${videoID}`;
    const newVideoData = [...videoData, newData];
    console.log(newData);
    setVideoData(newVideoData);
    console.log(videoData);
    console.log(newVideoData);
  }

  return (
    <div>
      <h1>Add your favorite video</h1>
      <Form className="col-sm-9 col-md-6 col-lg-4" onSubmit={submitHandler}>
        <Form.Group controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            onChange={(e) => setVideoTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicUrl">
          <Form.Label>URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="URL"
            onChange={(e) => setVideoURL(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddBar;
