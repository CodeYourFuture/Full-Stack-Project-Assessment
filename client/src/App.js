import React from "react";
import "./App.css";
import Video from "./components/Video";
import AddVideo from "./components/AddVideo";

function App() {
  React.useEffect(function () {
    console.log("Effect ran");
    fetch("http://127.0.0.1:5000")
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }, []);

  const [videos, setVideos] = React.useState([]);
  const videoElements = videos.map((video) => (
    <Video
      key={video.id}
      title={video.title}
      url={video.url}
      rating={video.rating}
      id={video.id}
      handleClickDelete={deleteVideo}
      handleClickAdd={ratingAdd}
      handleClickMinus={ratingMinus}
    />
  ));

  const [formData, setFormData] = React.useState({
    videoTitle: "",
    videoUrl: "",
  });

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function deleteVideo(id) {
    setVideos((prevVideos) => {
      return prevVideos.filter((video) => {
        return video.id !== id;
      });
    });
  }

  function ratingAdd(id) {
    setVideos((prevVideos) => {
      return prevVideos.map((video) => {
        return video.id === id ? { ...video, rating: video.rating + 1 } : video;
      });
    });
  }

  function ratingMinus(id) {
    setVideos((prevVideos) => {
      return prevVideos.map((video) => {
        return video.id === id ? { ...video, rating: video.rating - 1 } : video;
      });
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newVideoObject = {
      id: videos.length + 1,
      title: formData.videoTitle,
      url: formData.videoUrl,
      rating: Math.floor(Math.random() * 1000),
    };
    setVideos((prevVideos) => {
      return [...prevVideos, newVideoObject];
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AddVideo handleSubmit={handleSubmit} handleChange={handleChange} />
      <div className="allVideoContainer">{videoElements}</div>
    </div>
  );
}

export default App;
