import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const AddVideo = ({ setVideos }) => {
  const [addingVideo, setAddingVideo] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const VideoAdder = (e) => {
    e.preventDefault();
    const videoId = Math.floor(Math.random() * 1000000);
    const rating = 0;

    const newData = {
      id: videoId,
      title: title,
      url: url,
      rating: rating,
      timeSent: new Date().toLocaleDateString(),
    };

   if(newData.title !=="" && newData.url.includes("www.youtube.com/watch?v=")){
   setVideos((videos) => videos.concat(newData))
     
   } else {
    alert("Please fill the title and  valid url section");
   }
   setTitle("")
   setUrl("")
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
                  className="input"
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
                  className="input"
                  name="url"
                  type="text"
                  required
                  placeholder="url..."
                />
              </Form.Group>
            </Col>
          </Row>
          <Button
            onClick={VideoAdder}
            className=" mt-1 mb-3"
            variant="primary"
            type="submit"
           
          >
            ADD
          </Button>
          <Button
            onClick={() => setAddingVideo(!addingVideo)}
            className="ml-5 mt-3 mb-3"
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

export default AddVideo;
