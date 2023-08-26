import { useState } from "react";
import "./App.css";
import AddVideo from "./Components/AddVideo";
import AllVideos from "./Components/AllVideos";
import exampleresponse from "./Components/exampleresponse.json";

function App() {
  const [videos, setVideos] = useState(exampleresponse);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AddVideo setVideos={setVideos} videos={videos} />
      <AllVideos videos={videos} setVideos={setVideos} />
    </div>
  );
}

export default App;
