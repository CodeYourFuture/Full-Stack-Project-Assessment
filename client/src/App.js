import "./App.css";
import { useState, useEffect } from "react";
import Video from "./Video";
import AddVideo from "./AddVideo";
import Order from "./Order";
import Input from "./Input";

function App() {
  let [videos, setVideos] = useState([]);
  const [newVideo, setNewVideo] = useState({
    title: "",
    url: "",
  });
  const fetchedVideos = () => {
    fetch("http://localhost:5000/", {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:5000/",
      },
    })
      .then((res) => res.json())
      .then((data) => setVideos(data));
  };
  useEffect(fetchedVideos, []);

  const deleteVideo = (event, id) => {
    event.preventDefault();
    fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:5000/",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        fetchedVideos();
      })
      .catch((error) => console.log(error));
    /* const target = event.target;
    const videoId = target.parentNode.parentNode.id;
    console.log(videoId);
    const filteredVideos = videos.filter(
      // videoId is a string needs to be changed to a number
      (video) => video.id !== Number(videoId)
    );
    setVideos(filteredVideos); */
  };

  // handle multiple input change

  function handleChange(evt) {
    evt.preventDefault();
    let value = evt.target.value;
    setNewVideo({
      ...newVideo,
      [evt.target.name]: value,
    });
  }

  // handle submit button

  function handleSubmit(event) {
    event.preventDefault();
    const regex = /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9_-]+)/;
    if (newVideo.title && newVideo.url && newVideo.url.match(regex)) {
      fetch("http://localhost:5000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVideo),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          fetchedVideos();
          setNewVideo({});
        });
    }
  }
  //get video

  // order handler function
  function orderHandler() {}
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <em>Video Recommendation</em>
        </h1>
      </header>
      <div className="order-input-box">
        <Order orderHandler={orderHandler} />
        <AddVideo handleChange={handleChange} handleSubmit={handleSubmit} />
        <Input />
      </div>

      <div className="videos-container">
        {videos.map((video, index) => (
          /* video info holder div with unique id  */
          <Video
            key={index}
            id={video.id}
            title={video.title}
            url={video.url}
            deleteVideo={deleteVideo}
            rating={video.rating}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
