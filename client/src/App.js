import "./App.css";
import { useState, useEffect } from 'react';

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

  const recommendations = videos.length === 0
    ? <div>initialising</div>
    : videos.map((video) => {
        const params = new URL(video.url).searchParams;
        const embedUrl = `https://www.youtube.com/embed/${params.get('v')}`;
        return (
          <div key={video.id}>
            <h3>{video.title}</h3>
            <iframe width="560" height="315" src={embedUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            <div>rating: {video.rating}</div>
            <button onClick={() => deleteVideo(video.id)}>delete</button>
          </div>
        );
      });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        {recommendations}
      </header>
    </div>
  );
}

export default App;
