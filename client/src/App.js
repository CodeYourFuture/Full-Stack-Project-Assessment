import "./App.css";
import { useState, useEffect } from "react";
import AddVideo from "./components/AddVideo";
import VideosList from "./components/VideosList";

function App() {
  const [videos, setVideos] = useState([]);

  function handleDelete(id) {
    const updatedVideos = videos.filter((video) => video.id !== id);
    setVideos(updatedVideos);
  }

  function addVideo(title, url) {
    const newVideo = {
      title: title,
      url: url,
      id: Math.random().toString(),
      rating: 0,
    };
    setVideos([...videos, newVideo]);
  }

  useEffect(() => {
    fetch("http://localhost:5000")
      .then((response) => response.json())
      .then((data) => {
        setVideos(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <h1 className='mb-3 text-3xl font-bold'>Video Recommendation</h1>
      </header>
      <main className='container mx-auto'>
        <AddVideo addVideo={addVideo} />
        <VideosList
          videos={videos}
          handleDelete={handleDelete}
        />
      </main>
    </div>
  );
}

export default App;
