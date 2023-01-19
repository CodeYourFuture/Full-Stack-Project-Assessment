import React, { useState } from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
// import Button from "react-bootstrap/Button";

// import Button from "./AddVideo";
import AddVideo from "./AddVideo";
import AddVideoForm from "./AddVideoForm";
import dataVideos from "./exampleresponse.json";

import Search from "./Search";
import Video from "./Video";

function App() {
  const [addVideo, setAddVideo] = useState(false);
  //
  const [videoData, setVideoData] = useState(dataVideos);
  //

  const addVideoHandler = () => {
    setAddVideo((prevShowParagraph) => !prevShowParagraph);
  };

  return (
    <div className="App">
      <header className="p-3 mb-2 bg-secondary text-white">
        <h1>Video Recommendation</h1>
      </header>
      <Container className=" mt-3">
        <Row>
          <Col md>
            <AddVideo onClick={addVideoHandler}>Add Video</AddVideo>
            {addVideo && (
              <AddVideoForm setVideoData={setVideoData} />
            )}
          </Col>
          <Col md>
            <Search />
          </Col>
        </Row>
      </Container>
      <div>
        <Row xs={1} sm={2} md={3} className="mt-3">
          {videoData.map((video, key) => (
            <Video video={video} key={key} />
          ))}
        </Row>
      </div>
    </div>
  );
}

export default App;
