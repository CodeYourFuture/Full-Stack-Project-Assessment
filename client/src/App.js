import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import AddVideo from "./AddVideo";
import AddVideoForm from "./AddVideoForm";
import Search from "./Search";
import Video from "./Video";

function App() {
  const [addVideo, setAddVideo] = useState(false);
  const [videoData, setVideoData] = useState([]);
  const [videosFilter, setVideosFilter] = useState("");
  const [filteredVideoData, setFilteredVideoData] = useState([]);

  const addVideoHandler = () => {
    setAddVideo((prevVideo) => !prevVideo);
  };

  useEffect(() => {
    fetch("http://localhost:5000/video/")
      .then((res) => res.json())
      .then((data) => {
        setVideoData(data);
        setFilteredVideoData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    setFilteredVideoData(
      videoData?.filter((video) =>
        video.title.toLowerCase().includes(videosFilter.toLowerCase())
      ) || []
    );
  }, [videosFilter, videoData]);

  return (
    <div className="App bg-secondary.bg-gradient">
      <header className="shadow-sm p-4 mb-1 bg-success alert-dark">
        <h1 className="text-light active fst-italic">Video Recommendation</h1>
      </header>
      <Container className=" mt-3">
        <Row>
          <Col md>
            <AddVideo onClick={addVideoHandler}>Add Video</AddVideo>
            {addVideo && (
              <AddVideoForm setVideoData={setVideoData} videoData={videoData} />
            )}
          </Col>
          <Col md>
            <Search handler={(e) => setVideosFilter(e.target.value)} />
          </Col>
        </Row>
      </Container>
      <div>
        <Row xs={1} sm={2} md={3} className="mt-3">
          {filteredVideoData.map((video, key) => (
            <Video
              video={video}
              key={key}
              data={videoData}
              setData={setVideoData}
            />
          ))}
        </Row>
      </div>
    </div>
  );
}

export default App;
