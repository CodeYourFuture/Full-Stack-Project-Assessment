import React from "react";
import "./App.css";
import AddVideo from "./AddVideo";
import Jumbotron from "./Jumbotron";
import VideoList from "./VideoList";

function App() {
  // let [videos, setVideos] = useState(StartingVideos);

  return (
    <div className="App">
      <Jumbotron />
      <AddVideo />
      <VideoList />
    </div>
  );
}

export default App;
