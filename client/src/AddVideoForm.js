import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const AddVideoForm = ({ videoData, setVideoData }) => {
  const [addingVideo, setAddingVideo] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  // 
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

  if (newVideoData.title && newVideoData.url) {
    if (newVideoData.url.includes("www.youtube.com/watch?v=")) {
      // Check if video with same URL already exists
      const isDuplicate = videoData.some((video) => video.url === newVideoData.url);
      if (isDuplicate) {
        alert("This video is already in the list.");
      } else {
        
        setVideoData((videos) => [...videos, newVideoData]);

        setTitle("");
        setUrl("");
      }
    } else {
      alert("Invalid URL format. Please provide a valid youtube url.")
    }
  } else {
    alert("Please fill all the sections")
  }
};

  return (
    <div>
      <Container>
        <Form>
          <Row>
            <Col md>
              <Form.Group controlId="title">
                <Form.Label className="fw-bold">Title</Form.Label>
                <Form.Control
                  onChange={(e) => setTitle(e.target.value)}
                  className="input shadow-sm bg-white rounded"
                  name="title"
                  type="text"
                  required
                  placeholder="title..."
                  value={title}
                />
              </Form.Group>
            </Col>
            <Col md>
              <Form.Group controlId="url">
                <Form.Label className="fw-bold">URL</Form.Label>
                <Form.Control
                  onChange={(e) => setUrl(e.target.value)}
                  className="input shadow-sm bg-white rounded"
                  name="url"
                  type="text"
                  required
                  placeholder="url..."
                  value={url}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button
            onClick={handleVideoAdder}
            className=" mt-3 mb-3 shadow rounded fw-bold"
            variant="secondary"
            type="submit"
          >
            ADD
          </Button>
          <Button
            onClick={() => setAddingVideo(!addingVideo)}
            className="ml-5 mt-3 mb-3 shadow rounded fw-bold"
            variant="danger "
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
