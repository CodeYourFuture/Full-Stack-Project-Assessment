import "./App.css";
import { useState } from "react";
import exampleresponse from "./exampleresponse.json";
import VideoCard from "./components/VideoCard";

function App() {
  const [data, setData] = useState(exampleresponse);

  const deleteHandle = (id) => {
    const updatedData = data.filter((video) => video.id !== id)
    setData(updatedData)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        <div className="video-cards">
          {data.map((video) => (
            <VideoCard
              key={video.id}
              url={video.url}
              title={video.title}
              rating={video.rating}
              delete={() => deleteHandle(video.id)}
            />
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
