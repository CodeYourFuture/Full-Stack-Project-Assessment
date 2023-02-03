import React, { useEffect, useState } from "react";
import AddVideo from "./AddVideo";
import AddVideoForm from "./AddVideoForm";
import Search from "./Search";
import Video from "./Video";
import AscDesc from "./AscDesc";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  const [addVideo, setAddVideo] = useState(false);
  const [videoData, setVideoData] = useState([]);
  const [backup, setBackup] = useState([]);

  const [isAscending, setIsAscending] = useState(true);

  const handleClick = () => {
    setIsAscending(!isAscending);
    setVideoData(
      isAscending
        ? videoData.sort((a, b) => b.rating - a.rating)
        : videoData.sort((a, b) => a.rating - b.rating)
    );
  };

  const addVideoHandler = () => {
    setAddVideo((prevVideo) => !prevVideo);
  };

  useEffect(() => {
    fetch("/videos")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setVideoData(data);
        setBackup(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="App bg-light">
      <header className="shadow-sm p-2 mb-5 bg-white rounded">
        <h1>Video Recommendation</h1>
      </header>
      <Container className=" mt-3">
        <Row>
          <Col md>
            <AddVideo onClick={addVideoHandler}>Add Video</AddVideo>
            {addVideo && <AddVideoForm setVideoData={setVideoData} />}
          </Col>
          <Col md>
            <Search
              setVideoData={setVideoData}
              videoData={videoData}
              backup={backup}
            />
            <AscDesc handleClick={handleClick} isAscending={isAscending} />
          </Col>
        </Row>
      </Container>
      <div className="m-auto">
        <Row xs={1} sm={2} md={3} lg={4} className="m-auto">
          {videoData.map((video, key) => (
            <Video
              video={video}
              key={key}
              data={videoData}
              setData={setVideoData}
            />
          ))}
        </Row>
      </div>
      <footer className="shadow p-3 bg-white rounded ">
        <h6>Created and designed by Dawit Abraha</h6>
      </footer>
    </div>
  );
}

export default App;
