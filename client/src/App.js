import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import AddVideos from "./AddVideos";
import VideoInfo from "./VideoInfo";

function App() {
  const [videos, setVideos] = useState([]);

  const [toggleArea, setToggleArea] = useState(false);

  const [order, setOrder] = useState("ASC");

  const toggleShow = () => setToggleArea((s) => !s);

  function getAllVideos() {
    fetch(`http://localhost:3005/videos?order=${order}`)
      .then((response) => response.json())
      .then((data) => {
        setVideos(data);
      })
      .catch((error) => console.log(error));
  }

  function handleOrderChange() {
    order === "ASC" ? setOrder("DESC") : setOrder("ASC");
  }

  useEffect(() => {
    getAllVideos();
  }, [order]);

  return (
    <div className="App">
      <Header handleOrderChange={handleOrderChange} />
      <AddVideos getAllVideos={getAllVideos} />
      <button onClick={toggleShow}>Show Videos</button>
      <section>
        {toggleArea &&
          videos.length > 0 &&
          videos.map((video) => (
            <VideoInfo
              key={video.id}
              video={video}
              videos={videos}
              setVideos={setVideos}
              getAllVideos={getAllVideos}
            />
          ))}
      </section>
    </div>
  );
}

export default App;
