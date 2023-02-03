import React, { useState, useEffect } from "react";
import DeleteBtn from "./DeleteBtn";
import VideoAdd from "./VideoAdd";
import Videos from "./Videos";

function Main() {
  const [videos, setVideos] = useState([]);

  const [filtered, setFiltered] = useState(videos);
  useEffect(() => {
    fetch("http://localhost:3011/videos")
      .then((res) => res.json())
      .then((data) => {
        setVideos(data.sort((a, b) => b.rating - a.rating));
        setFiltered(data.sort((a, b) => b.rating - a.rating));
      });
  }, []);



  const handleSearch = (event) => {
    event.preventDefault();
    if (event.target.value === "") {
      setFiltered(videos);
    } else {
      setFiltered(
        videos
          .filter((video) =>
            video.title.toLowerCase().includes(event.target.value.toLowerCase())
          )
          .sort((a, b) => b.rating - a.rating)
      );
    }
  };

const handleSort = () => {
  
  setFiltered(videos.sort((b, a) => a.rating - b.rating));
};

  return (
    <div>
      <form>
        <input type="text" placeholder="Search..." onChange={handleSearch} />
      </form>
    <br />
    <button onClick={handleSort}>ORDER</button>

      <div>
        <VideoAdd />
      </div>

      <div>
        {filtered.map((video) => (
          <div key={video.id}>
            <Videos videos={video} />
            <DeleteBtn videos={setVideos} id={video.id} data={videos} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;
