import "./App.css";
import { useState, useEffect } from "react";
import AddVideo from "./components/AddVideo";
import VideosList from "./components/VideosList";

function App() {
  const [videos, setVideos] = useState([]);

  function handleDelete(id) {
    fetch(`https://full-stack-assessment-server-zpuo.onrender.com/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const updatedVideos = videos.filter((video) => video.id !== id);
        setVideos(updatedVideos);
      })
      .catch((error) => {
        console.error("Error deleting video:", error);
      });
  }

  function addVideo(title, url) {
    const newVideo = {
      title: title,
      url: url,
      rating: 0,
    };
    fetch("https://full-stack-assessment-server-zpuo.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVideo),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setVideos([...videos, data]);
      })
      .catch((error) => {
        console.error("Error adding video:", error);
      });
  }

  useEffect(() => {
    fetch("https://full-stack-assessment-server-zpuo.onrender.com")
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
