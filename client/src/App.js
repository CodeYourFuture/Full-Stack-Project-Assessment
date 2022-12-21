import React, { useEffect, useState } from "react";
import "./App.css";
import Video from "./components/Video";
import Header from "./components/Header";
import Modal from "./components/Modal";

function App() {
  const uri = "https://reco-videos-server.onrender.com/";

  const [openModal, setOpenModal] = useState(false);
  const [videos, setVideos] = useState([]);

  // List of videos
  const getVideos = () => {
    fetch(uri)
      .then(res => res.json())
      .then(data => setVideos(data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getVideos();
  }, [])

  // Delete a video
  const deleteVideo = (index) => {
    // let newVideos = videos;
    // newVideos.splice(index, 1);
    // setVideos([...newVideos]);
    fetch(`${uri}${index}`, { method: "delete" })
      .then((res) => res.json())
      .then(data => {
        getVideos();
        console.log(data);
      })
  }

  // Form details
  const [url, setUrl] = useState();
  const [title, setTitle] = useState();

  // Add video to list of videos
  const addVideo = () => {
    // let newVideos = videos;
    // newVideos.push({ title, url });
    // setVideos([...newVideos]);
    fetch(`${uri}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({id: videos.length, title, url})
    })
      .then((res) => res.json())
      .then((data) => {
        getVideos();
        console.log(data);
      })

    setTimeout(() => {
      setOpenModal(false); // removing modal from screen
    }, 1000)
  }

  return (
    <div>

      <header className="App-header bg-light">
        <Header getModal={() => setOpenModal(true)} />
      </header>

      <main className="container mt-3">
        {videos.map((video, key) => (
          <Video video={video} key={key} removeVideo={() => deleteVideo(video.id)} />
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
