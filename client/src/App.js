import AddVideo from "./componets/ADDVIDEO/AddVideo";
import SingleVideo from "./componets/SINGLEVIDEO/SingelVideo";
import Search from "./componets/Search/Search";
// import Data from "./VideoData.json";
import "./App.css";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";

function App() {
  const [videos, setVideos] = useState([]);
  const [originalState, setOriginalState] = useState([]);

  videos.sort((a, b) => b.rating - a.rating);
  // getting data from local server

  const getVideos = () => {
    fetch("videos/")
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
        setOriginalState(data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getVideos();
  }, []);

  // delete
  function removeVideo(id) {
    fetch(`videos/${id}`, { method: "delete" })
      .then((res) => res.json())
      .then((data) => {
        getVideos(data);
        console.log(data);
      });
  }

  return (
    <div className="App bg-light ">
      <header className="App-header">
        <h1 style={{ backgroundColor: "green" }}>Video Recommendation</h1>
        <Container className="mt-3">
          <Row>
            <Col md>
              <AddVideo setVideos={setVideos} />
            </Col>
            <Col md>
              <Search
                setVideos={setVideos}
                videos={videos}
                originalState={originalState}
              />
            </Col>
          </Row>
        </Container>
      </header>

      <main>
        <Container>
          <Row xs={1} sm={2} md={3} lg={4}>
            {videos.map((video) => {
              return (
                <SingleVideo
                  key={video.id}
                  id={video.id}
                  title={video.title}
                  url={video.url.replace("watch?v=", "embed/")}
                  ratingData={video.rating}
                  deleteVideo={removeVideo}
                />
              );
            })}
          </Row>
        </Container>
      </main>
    </div>
  );
}

export default App;
