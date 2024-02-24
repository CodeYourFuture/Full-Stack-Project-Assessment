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
    let res = await axios.get("http://13.40.127.171:8000/");
    setVideos(res.data);
  };

  const deleteVideo = async (id) => {
    let res = await axios.delete(`http://13.40.127.171:8000/${id}`);
    setVideos(res.data);
  };
  useEffect(() => {
    getVideos();
  }, []);

  const addVideo = async (video) => {
    let res = await axios.post("http://13.40.127.171:8000/", video);
    setVideos([res.data, ...videos]);
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

      <Cards
        videos={videos}
        upVote={upVote}
        downVote={downVote}
        deleteVideo={deleteVideo}
      />

      {/* <header className="App-header"></header> */}
    </div>
  );
}

export default App;
