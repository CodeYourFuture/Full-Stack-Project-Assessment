import "./App.css";
import VideoList from "./components/VideoList";
import InputForm from "./components/InputForm";
import AddVideoButton from "./components/AddVideoButton";
import { useState, useEffect } from "react";
import data from "./data/exampleresponse.json";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [videos, setVideos] = useState([""]);

  useEffect(() => {
    setVideos(data);
  }, []);

  const addVideo = (video) => {
    setVideos([...videos, video]);
  };

  const displayForm = () => setShowForm(true);
  const hideForm = () => setShowForm(false);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>

      <div className="addVideoForm">
        <AddVideoButton displayForm={displayForm} hideForm={hideForm} />
        {showForm ? <InputForm addVideo={addVideo} /> : null}
      </div>

      <VideoList videos={videos} />
    </div>
  );
}

export default App;
