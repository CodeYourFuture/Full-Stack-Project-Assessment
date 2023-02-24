import "./App.css";
import VideoList from "./components/VideoList";
import InputForm from "./components/InputForm";
import AddVideoButton from "./components/AddVideoButton";
import { useState, useEffect } from "react";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/")
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }, []);

  const handleDeleteVideo = (key) => {
    fetch(`http://127.0.0.1:5000/delete/${key}`, {
      method: "delete",
      body: JSON.stringify(key),
    })
      .then((response) => response.json())
      .then((data) => data);
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
        {showForm ? <InputForm /> : null}
      </div>

      <VideoList handleDeleteVideo={handleDeleteVideo} videos={videos} />
    </div>
  );
}

export default App;
