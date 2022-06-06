import React, {useState, useEffect} from "react";
import "./App.css";
import NewVideoForm from "./components/NewVideoForm";
import VideosContainer from "./components/VideosContainer";
import axios from "axios";

function App() {
    const [videos, setVideos] = useState([]);
    const loadVideos = () => {
      axios({
        method: "get",
        url: "/api",
      }).then((response) => {
        setVideos(response.data);
      });
    };

    useEffect(() => {
      loadVideos();
    }, []);

  return (
    <div>
      <header>
        <h1>Video Recommendation</h1>
      </header>
      <NewVideoForm loadVideos={loadVideos}/>
      <VideosContainer videos={videos} loadVideos={loadVideos}/>
    </div>
  );
}

export default App;
