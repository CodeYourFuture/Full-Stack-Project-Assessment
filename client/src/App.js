import AddVideo from "./componets/ADDVIDEO/AddVideo";
import SingleVideo from "./componets/SINGLEVIDEO/SingelVideo";
import Search from "./componets/Search/Search";
import Data from "./VideoData.json";
import "./App.css";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";

function App() {
  const [videos, setVideos] = useState(Data);
  const [videosFilter, setVideosFilter] = useState("");
  
// delete
  function removeVideo(id) {
    const filteredVideos = videos.filter((vid) => {
      return vid.id !== id;
    });
    setVideos(filteredVideos);
  }
  //  search
  useEffect(() => {
    setVideos(
      Data.filter((video) =>
        video.title
          .toLocaleLowerCase()
          .includes(videosFilter.toLocaleLowerCase())
      )
    );
  }, [videosFilter]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{backgroundColor: "lightblue"}}>Video Recommendation</h1>
        <Container className="mt-3">
          <Row>
            <Col md>
              <AddVideo setVideos={setVideos} />
            </Col>
            <Col md>
              <Search handler={(e) => setVideosFilter(e.target.value)} />
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
