import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const AddVideoForm = ({ setVideoData }) => {
  const [addingVideo, setAddingVideo] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleVideoAdder = (e) => {
    e.preventDefault();
    const videoId = Math.floor(Math.random() * 1000000);
    const rating = Math.floor(Math.random() * 10000);

    const newVideoData = {
      id: videoId,
      title: title,
      url: url,
      rating: rating,
      timeSent: new Date().toLocaleDateString(),
    };

    newVideoData.title && newVideoData.url.includes("www.youtube.com/watch?v=")
      ? setVideoData((videos) => videos.concat(newVideoData))
      : alert("Please fill all the sections");
    // setTitle('');
    // setUrl('')
  };
  return (
    <div>
      <Container>
        <Form>
          <Row>
            <Col md>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  onChange={(e) => setTitle(e.target.value)}
                  className="input shadow-sm bg-white rounded"
                  name="title"
                  type="text"
                  required
                  placeholder="title..."
                />
              </Form.Group>
            </Col>
            <Col md>
              <Form.Group controlId="url">
                <Form.Label>URL</Form.Label>
                <Form.Control
                  onChange={(e) => setUrl(e.target.value)}
                  className="input shadow-sm bg-white rounded"
                  name="url"
                  type="text"
                  required
                  placeholder="url..."
                />
              </Form.Group>
            </Col>
          </Row>
          <Button
            onClick={handleVideoAdder}
            className=" mt-3 mb-3 shadow rounded"
            variant="secondary"
            type="submit"
          >
            ADD
          </Button>
          <Button
            onClick={() => setAddingVideo(!addingVideo)}
            className="ml-5 mt-3 mb-3 shadow rounded"
            variant="danger"
            type="cancel"
          >
            Cancel
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default AddVideoForm;
