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

  const handleSearch = (e) => {
    if (e.target.value === "") {
      setFiltered(videos);
    } else {
      setFiltered(
        videos
          .filter((video) =>
            video.title.toLowerCase().includes(e.target.value.toLowerCase())
          )
          .sort((a, b) => b.rating - a.rating)
      );
    }
  };

  return (
    <div>
      <form>
        <input
          className="search"
          type="text"
          placeholder="Search..."
          onChange={handleSearch}
        />
      </form>
      <div>
        <VideoAdd />
      </div>

      <div>
        {filtered.map((video) => (
          <div>
            <Videos videos={video} />
            <DeleteBtn videos={setVideos} id={video.id} data={videos} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;

