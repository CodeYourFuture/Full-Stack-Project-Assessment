import "./App.css";
import { useState, useEffect } from "react";
import Video from "./Video";
import AddVideo from "./AddVideo";
import Order from "./Order";
import Input from "./Input";

function App() {
  let [videos, setVideos] = useState([]);
  let [search, setSearch] = useState("");

  const [order, setOrder] = useState("asc");
  const [newVideo, setNewVideo] = useState({
    title: "",
    url: "",
  });

  // fetch videos from url

  const fetchedVideos = () => {
    fetch(`http://localhost:5000/?order=${order}`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": `http://localhost:5000/?order=${order}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setVideos((videos) => data);
      });
  };
  useEffect(fetchedVideos, [order]);

  // get video by id
  /*  const getVideoById = (search) => {
    fetch(`http://localhost:5000/search/${search}`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:5000/",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  }; */

  /**************delete element by id ************/

  const deleteVideo = (id) => {
    fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:5000/",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert("video will be deleted ");
        }
        fetchedVideos();
      })
      .catch((error) => console.log(error));
  };

  /*********************handle multiple input change****************/

  function handleChange(evt) {
    evt.preventDefault();
    let value = evt.target.value;
    setNewVideo({
      ...newVideo,
      [evt.target.name]: value,
    });
  }

  /**********************handle submit button *********************/

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

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <em>Video Recommendation</em>
        </h1>
      </header>
      <div className="order-input-box">
        <Order order={order} setOrder={setOrder} />
        <AddVideo handleChange={handleChange} handleSubmit={handleSubmit} />
        <Input
          search={search}
          setSearch={setSearch}
          // getVideoById={getVideoById}
        />
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
