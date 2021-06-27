import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

const AddBar = ({
  setVideoData,
  videoData,
  setIsDataUpdating,
  isDataUpdating,
}) => {
  const [videoTitle, setVideoTitle] = useState();
  const [videoURL, setVideoURL] = useState();
  const [showAddFeature, setShowAddfeature] = useState(false);
  function youTubeGetID(url) {
    url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
    // return url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : "error";
  }
  function submitHandler(e) {
    e.preventDefault();
    if (videoURL && videoTitle) {
      console.log("submithandler");
      const videoID = youTubeGetID(videoURL);
      console.log(videoID);
      const url = `https://www.youtube.com/embed/${videoID}`;
      const body = {
        url: url,
        title: videoTitle,
      };
      console.log(body);
      fetch("http://localhost:5000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((body) => {
          console.log("Success:", body);
          setIsDataUpdating(!isDataUpdating);
          setShowAddfeature(false);
          setVideoURL("");
          setVideoTitle("");
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  }

  return (
    <div>
      <h1>Add your favorite video</h1>
      {showAddFeature ? (
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
          <Button variant="primary" type="submit" aria-label="Submit">
            Submit
          </Button>
        </Form>
      ) : (
        <button onClick={() => setShowAddfeature(true)}>Add a video</button>
      )}
    </div>
  );
};

export default AddBar;
