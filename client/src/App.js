import Heading from "./Heading";
import Home from "./Home";
import Form from "./Form";
import axios from "axios";

import Search from "./Search";
import Cards from "./Cards";
import { useEffect, useState } from "react";

function App() {
  const [videos, setVideos] = useState([]);

  const getVideos = async () => {
    let res = await axios.get("http://localhost:8000/videos");
    setVideos(res.data);
  };

  useEffect(() => {
    getVideos();
  }, []);

  const addVideo = (video) => {
    video.id = videos.length + 1;
    setVideos([video, ...videos]);
  };

  const upVote = (id) => {
    const newVideos = videos.map((video) => {
      if (video.id == id) {
        video.rating++;
      }
      return video;
    });
    setVideos(newVideos);
  };

  const downVote = (id) => {
    const newVideos = videos.map((video) => {
      if (video.id == id) {
        video.rating--;
      }
      return video;
    });
    setVideos(newVideos);
  };

  return (
    <div className="App">
      <Heading />
      <div className="form-container">
        <Form addVideo={addVideo} />
        <Search />
      </div>

      <Cards videos={videos} upVote={upVote} downVote={downVote} />

      {/* <header className="App-header"></header> */}
    </div>
  );
}

export default App;
