import React, { useEffect, useState } from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "react-bootstrap";

import AddVideo from "./AddVideo";
import NewVideos from "./NewVideos";
import Search from "./Search";
import Video from "./Video";

function App() {
  const [addVideo, setAddVideo] = useState(false);
  const [videoData, setVideoData] = useState([]);
  const [backup, setBackup] = useState([]);
  const [sortD, setSortD] =useState("desc");
  videoData.sort((a, b) => b.rating - a.rating)

  const addingVideo= () => {
    setAddVideo((prevVideo) => !prevVideo);


  };

  const toggleList = () => {
    setSortD(sortD === "asc" ? "desc" : "asc");
  };
  const sortedVideos = videoData.sort((a, b) => {
    if (sortD === "asc") {
      return a.rating - b.rating;
    }
    return b.rating - a.rating;
  });

  useEffect(() => {
    fetch('http://localhost:5000/movies')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setVideoData(data)
        setBackup(data)
      })
    .catch((error) => console.log(error))
  }, []);

  return (
    <div className="App bg-light">
      <header className="shadow-sm p-3 mb-5 bg-white rounded ">
        <h1>Video Recommendation</h1>
      </header>
      <Container className=" mt-3">
        <Row>
          <Col md>
            <AddVideo onClick={addingVideo}>Add Video</AddVideo>
            {addVideo && <NewVideos setVideoData={setVideoData} />}
          </Col>
          <Col md>
            <Search setVideoData={setVideoData} videoData={videoData} backup={backup} />
          </Col>
          {/* <Col md>
        <button onClick={toggleList}
        className=" mt-3 mb-3 shadow rounded"
        variant="info" 
        type="submit">Sort </button>
      </Col> */}
        </Row>
        
        <Button onClick={toggleList}
         className=" mt-3 mb-3 shadow rounded"
         variant="primary" 
        type="button">Sort </Button>
        
      </Container>
      <div>
        <Row xs={1} sm={2} md={3} className="mt-3">
          {sortedVideos.map((video, key) => (
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
