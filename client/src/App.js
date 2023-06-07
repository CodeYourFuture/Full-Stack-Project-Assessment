import "./App.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Video from "./Video.jsx";
import React, { useState, useEffect } from "react";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [videos, setVideos] = useState([]);
  const [newVideoTitle, setNewVideoTitle] = useState("");
  const [newVideoUrl, setNewVideoUrl] = useState("");

  useEffect(() => {
    fetchVideos();
  }, []);

  function fetchVideos() {
    fetch("https://video-server-wsp9.onrender.com/videos")
      .then((res) => res.json())
      .then((data) => setVideos(data))
      .catch((error) => console.log(error));
  }

  function handleShowModal() {
    setShowModal(!showModal);
  }

  function handleDelete(id) {
    fetch(`https://video-server-wsp9.onrender.com/videos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return {};
        }
      })
      .then((deleteVideo) => {
        const updatedVideos = videos.filter(
          (video) => video.id !== deleteVideo.id
        );
        setVideos(updatedVideos);
      })
      .catch((error) => console.log(error));
  }

  function handleAddVideo() {
    if (newVideoTitle.trim() === "") {
      alert("Please enter a valid title.");
      return;
    }

    if (!newVideoUrl.includes("youtube.com")) {
      alert("Please enter a valid YouTube URL.");
      return;
    }

    // const newVideoId = Date.now().toString(); // Generate unique ID using current timestamp

    const formattedUrl = newVideoUrl.replace("watch?v=", "embed/"); // Modify the URL format

    const newVideo = {
      //id: newVideoId,
      title: newVideoTitle,
      url: formattedUrl,
      //rating: 0,
    };

    fetch("https://video-server-wsp9.onrender.com/videos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVideo),
    })
      .then((res) => res.json())
      .then((data) => setVideos([...videos, data]))
      .catch((error) => console.log(error));

    setNewVideoTitle("");
    setNewVideoUrl("");
    setShowModal(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>

      <Container>
        <Row>
          <Col>
            <Button
              className="addVideoBtn"
              variant="link"
              onClick={handleShowModal}
            >
              Add video
            </Button>
            {showModal && (
              <div>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
                  <Form.Control
                    aria-label="Title"
                    aria-describedby="basic-addon1"
                    value={newVideoTitle}
                    onChange={(e) => setNewVideoTitle(e.target.value)}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">Url</InputGroup.Text>
                  <Form.Control
                    aria-label="URL"
                    aria-describedby="basic-addon1"
                    value={newVideoUrl}
                    onChange={(e) => setNewVideoUrl(e.target.value)}
                  />
                </InputGroup>
                <br />
                <Button variant="warning" onClick={handleShowModal}>
                  Cancel
                </Button>{" "}
                <Button variant="danger" onClick={handleAddVideo}>
                  Add
                </Button>{" "}
              </div>
            )}
          </Col>
          <Col>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
              <Form.Control
                aria-label="Search"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </Col>
        </Row>
      </Container>

      <div className="cards">
        {videos.map((item) => (
          <Video key={item.id} info={item} handleDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default App;
