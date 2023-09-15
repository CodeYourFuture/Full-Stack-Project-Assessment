import React, { useEffect, useState } from "react";
import Video from "./Video";
import AddVideo from "./AddVideo";
import "../index.css";
import Search from "./Search";

function VideosList() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    fetch("https://node-server-full-stack.onrender.com/videos")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setVideos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const newVideo = (newInput) => {
    newInput.id = videos.length + 1;
    newInput.rating = 0;
    fetch("https://node-server-full-stack.onrender.com/videos", {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
      },
      body: JSON.stringify(newInput),
    })
      .then((res) => {
        fetchVideos();
        return res.json();
      })
      .then((data) => {
        if (data && data.message === "Video stored successfully") {
          setVideos([...videos, newInput]);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Something went wrong");
      });
  };

  const deleteVideoItem = (videoId) => {
    fetch(`https://node-server-full-stack.onrender.com/videos/${videoId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/JSON",
      },
    }).then((res) => {
      const videoDeleted = videos.filter((el) => el.id !== videoId);
      res.setVideos(videoDeleted);
    });
  };

  const fetchVideos = () => {
    fetch("https://node-server-full-stack.onrender.com/videos")
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
        searchResult(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const searchByName = (search) => {
    fetch(`https://node-server-full-stack.onrender.com/videos/${search}`, {
      method: "GET",
      headers: { "content-type": "application/JSON" },
    })
      .then((res) => res.json())
      .then((data) => {
        setSearchResult(data);
        console.log(data)
      });
  };
  const sortedVideos = [...videos].sort((a, b) => b.rating - a.rating);
  return (
    <>
      <Search onSearch={searchByName} />
      <AddVideo onVidAdd={newVideo} />
      <div className="container mt-5">
        {searchResult.length > 0 ? (
          searchResult.map((video) => <Video videoObj={video} key={video.id} deleteVideo={deleteVideoItem} />)
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          sortedVideos.map((video) => <Video videoObj={video} key={video.id} deleteVideo={deleteVideoItem} />)
        )}
      </div>
    </>
  );
}

export default VideosList;
