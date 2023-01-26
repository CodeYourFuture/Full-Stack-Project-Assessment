import React, { useEffect, useState } from "react";
import "./App.css";
import dataVideos from "./exampleresponse.json";
import VideoCard from "./VideoCard";
import AddVideo from "./AddVIdeo";

function App() {
  const [videos, setVideos] = useState([]);
  const [reqBody, setReqBody] = useState({
    title: "",
    url: "",
  });

  useEffect(() => {
    let allVideos = [...dataVideos].sort((a, b) =>
      a.rating > b.rating ? 1 : -1
    );
    setVideos(allVideos);
  }, []);

  function handleDelete(id) {
    let filterVideos = videos.filter((video) => video.id !== id);
    setVideos(filterVideos);
  }

  function resetForm() {
    setReqBody({
      title: "",
      url: "",
    });
  }

  function handleSubmit() {
    let lastIndex = videos.length - 1;
    let lastId = videos[lastIndex].id;
    let idPosition = lastId + 1;

    let result = [
      ...videos,
      {
        id: idPosition,
        title: reqBody.title,
        url: reqBody.url,
        rating: 2,
      },
    ];
    setVideos(result);
    resetForm();
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
