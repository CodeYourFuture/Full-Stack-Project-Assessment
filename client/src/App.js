import React, { useEffect, useState } from "react";
// import videos from "./exampleresponse.json";
import Video from "./Video";
import "./App.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");

  //const [videoList, setVideoList] = useState(videos);

  //get video from expres
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/videos");
      const data = await response.json();
      setVideoList(data);
    };
    fetchData();
  }, []);

  const handleAdd = async () => {
    // Create a new video object with the newTitle and newUrl
    const newVideo = {
      title: newTitle,
      url: newUrl,
      rating: 0,
      id: videoList.length + 1,
    };

    // Send a POST request to the server to store the new video
    await fetch("/videos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVideo),
    });

    // Add the new video to the list
    setVideoList([...videoList, newVideo]);

    // Reset the newTitle and newUrl states
    setNewTitle("");
    setNewUrl("");
  };

  const handleThumbUp = (index) => {
    const newVideos = [...videoList];
    newVideos[index].rating += 1;
    setVideoList(newVideos);
  };

  const handleThumbDown = (index) => {
    const newVideos = [...videoList];
    if (newVideos[index].rating > 0) {
      newVideos[index].rating -= 1;
      setVideoList(newVideos);
    }
  };

  const handleDelete = (index) => {
    const newVideos = [...videoList];
    newVideos.splice(index, 1);
    setVideoList(newVideos);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredVideos = videoList.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-container">
      <h1>Video Recommendations</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="YouTube URL"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
        <input
          type="text"
          placeholder="Search for a video..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a video..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="video-container">
        {filteredVideos.map((video, index) => {
          let url = video.url.split("v=")[1];
          return (
            <Video
              key={video.id}
              title={video.title}
              rating={video.rating}
              url={url}
              onThumbUp={() => handleThumbUp(index)}
              onThumbDown={() => handleThumbDown(index)}
              onDelete={() => handleDelete(index)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
