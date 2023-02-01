import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const AddVideo = ({ setVideos }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function matchYoutubeUrl(url) {
    let urlType =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(urlType)) {
      return url.match(urlType)[1];
    }
    return false;
  }

  const VideoAdder = (e) => {
    // e.preventDefault();

    const newVideo = {
      title: title,
      url: url,
      rating: 0,
      timeSent: new Date().toLocaleDateString(),
    };
    if (matchYoutubeUrl(url)) {
      setTitle("");
      setUrl("");

      axios.post("/videos", newVideo).then((res) => {
        if (res.status === 201) {
          axios.get("/videos").then((res) => {
            setVideos(res.data);
          });
        }
      });
    }
  };
  return (
    <>
      <Button className="mb-5" variant="primary" onClick={handleShow}>
        Click to add Videos
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Url and Title</Modal.Title>
        </Modal.Header>

        <div>
          <Container>
            <Modal.Body>
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
                  className=" mt-3 mr-2 mb-3"
                  variant="primary"
                  type="submit"
                >
                  ADD
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Close
                </Button>
              </Form>
            </Modal.Body>
          </Container>
        </div>
      </Modal>
    </>
  );
};

export default AddVideo;
