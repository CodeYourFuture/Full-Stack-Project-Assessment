import React, { useState, useEffect } from "react";
import VideoCell from "./VideoCell";
import Header from "./Header";
import AddVideo from "./AddVideo";
import Search from "./Search";

function HomePage() {
  const [videos, setVideos] = useState([]);
  //const [empty, setEmpty] = useState(false);

  const getData = async () => {
    const res = await fetch("https://video-laleh.herokuapp.com/api/videos");
    const data = await res.json();
    //console.log(data);
    setVideos(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`https://video-laleh.herokuapp.com/api/videos/${id}`, {
        method: "DELETE",
      });
      setVideos(videos.filter((video) => video.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (event, title, url) => {
    event.preventDefault();
    try {
      await fetch("https://video-laleh.herokuapp.com/api/videos", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          url: url,
        }),
      });

      getData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = async (searchText) => {
    const res = await fetch(
      `https://video-laleh.herokuapp.com/api/videos/?searchText=${searchText.toLowerCase()}`
    );
    const data = await res.json();
    //console.log(data);
    setVideos(data);
  };

  return (
    <div>
      <Header />
      <AddVideo onAdd={handleSubmit} />
      <Search onSearch={handleSearch} />
      <div className="videos-Container">
        {videos.map((video, index) => {
          return (
            <VideoCell
              key={index}
              id={video.id}
              title={video.title}
              url={video.url}
              rating={video.rating}
              onDelete={handleDelete}
            />
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
