import React, { useEffect, useState } from "react";
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
  const [videosFilter, setVideosFilter] = useState("");
  //

  const addVideoHandler = () => {
    setAddVideo((prevVideo) => !prevVideo);
  };

  useEffect(() => {
    setVideoData(
      dataVideos.filter((video) =>
        video.title.toLowerCase().includes(videosFilter.toLowerCase())
      )
    );
  }, [videosFilter]);

  return (
    <div className="App bg-light">
      <header className="shadow-sm p-3 mb-5 bg-white rounded ">
        <h1>Video Recommendation</h1>
      </header>
      <Container className=" mt-3">
        <Row>
          <Col md>
            <AddVideo onClick={addVideoHandler}>Add Video</AddVideo>
            {addVideo && <AddVideoForm setVideoData={setVideoData} />}
          </Col>
          <Col md>
            <Search handler={(e) => setVideosFilter(e.target.value)} />
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
