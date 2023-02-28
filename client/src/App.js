import "./App.css";
import { useState } from "react";
import Video from "./Video";
import AddVideoButton from "./AddVideoButton";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

function App() {
  const [videos, setVideos] = useState([]);

  const addVideo = (title, url) => {
    setVideos([...videos, { title, url, votes: 0, id: videos.length }]);
  };

  const removeVideo = (id) => {
    setVideos(videos.filter((video) => video.id !== id));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Video Recommendation Engine</h1>
        <AddVideoButton onVideoAdded={addVideo} />
      </header>
      <hr />
      <Container className="container">
        {videos.map((video) => (
          <Col>
            <Video
              key={video.id}
              id={video.id}
              title={video.title}
              url={video.url}
              votes={video.votes}
              onVideoRemoved={removeVideo}
            />
          </Col>
        ))}
      </Container>
      <hr />
    </div>
  );
}

export default App;
