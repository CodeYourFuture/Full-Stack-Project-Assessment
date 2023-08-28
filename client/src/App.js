import React from "react";
import "./App.css";
import Video from "./components/Video";
import AddVideo from "./components/AddVideo";

const serverAddress = "http://127.0.0.1:5000";

function App() {
  const [count, setCount] = React.useState(0);
  React.useEffect(
    function () {
      console.log("Effect ran");
      fetch(serverAddress)
        .then((res) => res.json())
        .then((data) => setVideos(data));
    },
    [count]
  );

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
    title: "",
    url: "",
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
    fetch(`${serverAddress}/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
    setCount((prevCount) => prevCount + 1);
    console.log(count);
    // setVideos((prevVideos) => {
    //   return prevVideos.filter((video) => {
    //     return video.id !== id;
    //   });
    // });
  }

  function ratingAdd(id) {
    fetch(`${serverAddress}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ modifier: "+1" }),
    });
    setCount((prevCount) => prevCount + 1);
    console.log(count);
  }
  // setVideos((prevVideos) => {
  //   return prevVideos.map((video) => {
  //     return video.id === id ? { ...video, rating: video.rating + 1 } : video;
  //   });
  // });
  // }

  function ratingMinus(id) {
    setVideos((prevVideos) => {
      return prevVideos.map((video) => {
        return video.id === id ? { ...video, rating: video.rating - 1 } : video;
      });
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch(serverAddress, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
    setCount((prevCount) => prevCount + 1);
    console.log(count);
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
