import "./App.css";
import { useState } from "react";
import AddVideo from "./components/AddVideo";
import VideosList from "./components/VideosList";
import data from "./exampleresponse.json";

function App() {
  const [videos, setVideos] = useState(data);

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
