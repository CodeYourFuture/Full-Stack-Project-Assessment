import React, { useState } from "react";
import "./App.css";
import Video from "./components/Video";
import dataVideos from "./exampleresponse.json";
import Header from "./components/Header";
import Modal from "./components/Modal";

function App() {

  // Model state
  const [openModal, setOpenModal] = useState(false);

  // List of videos
  const [videos, setVideos] = useState(dataVideos);
  const deleteVideo = (index) => {
    let newVideos = videos;
    newVideos.splice(index, 1);
    setVideos([...newVideos]);
  }

  // Form details
  const [url, setUrl] = useState();
  const [title, setTitle] = useState();

  // Add video to list of videos
  const addVideo = () => {
    let newVideos = videos;
    newVideos.push({ title, url });
    setVideos([...newVideos]);

    setOpenModal(false); // removing modal from screen
  }


  return (
    <div>

      <header className="App-header bg-light">
        <Header getModal={() => setOpenModal(true)} />
      </header>

      <main className="container mt-3">
        {videos.map((video, key) => (
          <Video video={video} key={key} removeVideo={() => deleteVideo(key)} />
        ))}

        {openModal && <Modal
          cancelModal={() => setOpenModal(false)}
          url={(e) => setUrl(e.target.value)}
          title={(e) => setTitle(e.target.value)}
          add={addVideo} />}
      </main>

    </div>
  );
}

export default App;
