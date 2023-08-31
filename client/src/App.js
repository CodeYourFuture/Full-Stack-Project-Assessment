import "./App.css";
import { useState, useEffect } from 'react';
import Recommendation from './Recommendation.js';

const baseUrl = "http://localhost:5001";

function App() {
  const [videos, setVideos] = useState([]);

  function getVideos() {
    fetch(`${baseUrl}/`)
      .then(response => response.json())
      .then(videos => setVideos(videos))
      .catch(error => console.log(error));
  }
  function deleteVideo(id) {
    fetch(`${baseUrl}/${id}`, {method: "DELETE"})
      .then(response => response.json())
      .then(result => {
        if (result["result"] !== "failure") {
          getVideos();
        } else {
          console.log("could not delete");
        }
      });
  }

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        {
          videos.length === 0
            ? <div>initialising</div>
            : videos.map((video) => (
                <Recommendation
                  key={video.id}
                  video={video}
                  deleteVideo={deleteVideo}
                />
              ))
        }
      </header>
    </div>
  );
}

export default App;
