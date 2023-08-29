import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import AddVideoForm from "./AddVideoForm";
import SingleVideoCard from "./SingleVideoCard";
//import exampleResponse from "./exampleresponse.json";

function VideoCards() {
  //const [videos, setVideos] = useState(exampleResponse);
  const [videos, setVideos] = useState([]);
  const urlAPI = "http://127.0.0.1:5000";

  //fetching the videos from local API

  useEffect(() => {
    fetchVideo();
  }, []);

  async function fetchVideo() {
    const response = await fetch(urlAPI);
    const jsonResponse = await response.json();
    setVideos(jsonResponse);
  }

  //Deleting from API. Help with response in console

  function handleDelete(id) {
    fetch(`${urlAPI}/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        console.log("Response Status:", response.status);
        response.json();
      })
      .then(() => {
        setVideos((prevVideos) => {
          return prevVideos.filter((video) => video.id !== id);
        });
      })
      .catch((error) => console.error(error));
  }

  // function search(searchValue) {
  //   const filteredVideos = videos.filter((item) =>
  //     item.title.toLowerCase().includes(searchValue.toLowerCase())
  //   );
  //   setVideos(filteredVideos);
  // }

  //Searching from API

  function search(searchValue) {
    const filteredVideos = videos.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    if (searchValue.trim() === "") {
      fetchVideo();
    } else {
      setVideos(filteredVideos);
    }
  }

  // function addVideo(v) {
  //   const videoId = v.url.match(
  //     /(?:\/|%3D|v=|vi=)([0-9A-Za-z_-]{11})(?:[%#?&]|$)/
  //   )[1]; //this piece of code extract the Youtube video id given from a Youtube url.
  //   setVideos((currVideos) => {
  //     return [...currVideos, { ...v, rating: 0, id: videoId }];
  //   });
  // }

  //Posting the form

  function addVideo(v) {
    fetch(urlAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(v),
    })
      .then((response) => response.json())
      .then((data) => {
        const videoId = v.url.match(
          /(?:\/|%3D|v=|vi=)([0-9A-Za-z_-]{11})(?:[%#?&]|$)/
        )[1]; //this piece of code extract the Youtube video id given from a Youtube url.
        setVideos((currVideos) => {
          return [...currVideos, { ...v, rating: 0, id: videoId }];
        });
      });
  }

  return (
    <>
      <div className="top-components">
        <AddVideoForm addVideo={addVideo} />
        <SearchBar search={search} />
      </div>

      {videos.map((video) => (
        <SingleVideoCard
          key={video.id}
          title={video.title}
          url={video.url}
          rating={video.rating}
          deleteVideo={() => handleDelete(video.id)}
        />
      ))}
    </>
  );
}

export default VideoCards;
