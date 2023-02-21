import "./App.css";
import VideoList from "./components/VideoList";
import InputForm from "./components/InputForm";
import AddVideoButton from "./components/AddVideoButton";
import { useState, useEffect } from "react";
//import data from "./data/exampleresponse.json";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [videos, setVideos] = useState([""]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/")
      .then((res) => res.json())
      .then((data) => setVideos(data));
    //setVideos(data);
  }, []);

  // const addVideo = (video) => {
  //   setVideos([...videos, video]);
  // };

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

      <VideoList videos={videos} />
    </div>
  );
}

export default App;
