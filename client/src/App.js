import React, { useEffect, useState } from "react";
import "./App.css";
import VideoCard from "./VideoCard";
import AddVideo from "./AddVIdeo";

function App() {
  const [loadVideos, setLoadVideos] = useState(true);
  const [videos, setVideos] = useState([]);

  //request body
  const [reqBody, setReqBody] = useState({
    title: "",
    url: "",
    rating: 0,
  });

  // local api endpoint
  const API_URL = "http://localhost:5001/videos";

  useEffect(() => {
    fetch(`${API_URL}`)
      .then((res) => res.json())
      .then((data) => {
        let allVideos = [...data].sort((a, b) =>
          a.rating > b.rating ? 1 : -1
        );
        setVideos(allVideos);
      });
  }, [loadVideos]);

  function handleDelete(id) {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setLoadVideos(!loadVideos);
      })
      .catch((error) => {
        alert("Could not delete!");
        console.error("There was an error!", error);
      });
  }

  function resetForm() {
    setReqBody({
      title: "",
      url: "",
    });
  }

  function handleSubmit() {
    fetch(`${API_URL}`, {
      method: "POST",
      body: JSON.stringify({
        title: reqBody.title,
        url: reqBody.url,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        resetForm();
        setLoadVideos(!loadVideos);
      })
      .catch((error) => {
        alert("Could not save!");
        console.error("There was an error", error);
      });
  }

  function handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setReqBody({
      ...reqBody,
      [name]: value,
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>

      <body>
        <div className="container">
          <div className="m-3">
            <AddVideo
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleCancel={() => resetForm()}
              reqBody={reqBody}
            />
          </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {videos.map((video, key) => (
              <div className="col">
                <VideoCard
                  video={video}
                  key={key}
                  handleDelete={() => handleDelete(video.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </body>
    </div>
  );
}

export default App;