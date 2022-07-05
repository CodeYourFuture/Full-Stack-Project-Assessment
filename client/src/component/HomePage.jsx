import React, { useState, useEffect } from "react";
import VideoCell from "./VideoCell";
import Header from "./Header";
import Form from "./From";
import Search from "./Search";
import Footer from "./Footer";
import Sort from "./Sort";

function HomePage() {
  const [videos, setVideos] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(true);
  const [order, setOrder] = useState("desc");

  const getData = async () => {
    const res = await fetch(
      `https://video-laleh.herokuapp.com/api/videos/?order=${order}`
    );
    const data = await res.json();
    setVideos(data);
    setIsDataLoaded(false);
  };

  useEffect(() => {
    getData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleUpdate = async (rating, id) => {
    try {
      await fetch("https://video-laleh.herokuapp.com/api/videos", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          rating: rating,
        }),
      });
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = async (searchText) => {
    const res = await fetch(
      `https://video-laleh.herokuapp.com/api/videos/?searchText=${searchText.toLowerCase()}&order=${order}`
    );
    const data = await res.json();
    setVideos(data);
  };

  const handleSort = (event, sortValue) => {
    event.preventDefault();
    let sortedVideo;
    //.slice make a copy of video
    sortValue === "asc"
      ? (sortedVideo = videos.slice().sort((a, b) => a.rating - b.rating))
      : (sortedVideo = videos.slice().sort((a, b) => b.rating - a.rating));
    setVideos(sortedVideo);
    setOrder(sortValue);
  };

  return (
    <div>
      <Header />
      <Form onAdd={handleSubmit} />
      <div className="search-sort">
        <Search onSearch={handleSearch} getAllVideo={getData} />
        <Sort onChange={handleSort} />
      </div>

      {!isDataLoaded ? (
        <div className="videos-Container">
          {videos.map((video, index) => {
            return (
              <VideoCell
                key={video.id}
                id={video.id}
                title={video.title}
                url={video.url}
                rating={video.rating}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            );
          })}
        </div>
      ) : (
        <p className="dataLoading">Data is loading....</p>
      )}
      <Footer />
    </div>
  );
}

export default HomePage;
