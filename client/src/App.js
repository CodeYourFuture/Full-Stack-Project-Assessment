import { useState, useEffect } from "react";
import "./App.css";
import Video from "./Video";
// import Button from "./components/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

function App() {
  const [videos, setVideos] = useState([]);

  const addVideo = (title, url) => {
    
    setVideos([...videos, { title, url, votes: 0, id: videos.length }]);
  };

  const removeVideo = async (id) => {
    const res = await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
    });
    await res.json();
    setVideos(videos.filter((video) => video.id !== id));
  };

  useEffect(() => {
    async function getVideos() {
      const response = await fetch("http://localhost:5000");
      const data = await response.json();
      console.log(data);

      setVideos([...data]);
    }

    getVideos();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Video Recommendation Engine</h1>
        <AddVideo onVideoAdded={addVideo} />
      </header>
      <hr />
      <Container className="container">
        {videos.map((video) => (
          <Col>
            <Video className="video"
              key={video.id}
              id={video.id}
              title={video.title}
              url={
                "https://youtube.com/embed/" +
                video.url
                  .match(/v=([^&]+)/g)
                  .join()
                  .slice(2)
              }
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

