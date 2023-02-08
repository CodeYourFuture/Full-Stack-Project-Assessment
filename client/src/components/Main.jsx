import React, { useState, useEffect } from "react";
import DeleteBtn from "./DeleteBtn";
import VideoAdd from "./VideoAdd";
import Videos from "./Videos";

function Main() {
  const [videos, setVideos] = useState([]);
  const [sort, setSort] = useState(["asc"]);

  const [filtered, setFiltered] = useState(videos);
  useEffect(() => {
    fetch("https://youtubevideos.onrender.com")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setVideos(data);
        setFiltered(data);
      });
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    if (event.target.value === "") {
      setFiltered(videos);
    } else {
      setFiltered(
        videos.filter((video) =>
          video.video_title
            .toLowerCase()
            .includes(event.target.value.toLowerCase())
        )
      );
    }
  };

  const handleSort = () => {
    if (sort === "asc") {
      setFiltered((prevState) =>
        prevState.sort((a, b) => a.video_rating - b.video_rating)
      );
      setSort("desc");
    } else {
      setFiltered((prevState) =>
        prevState.sort((a, b) => b.video_rating - a.video_rating)
      );
      setSort("asc");
    }
  };

  return (
    <div>
      <form className="form-container">
        <input
          className="search-box"
          type="text"
          placeholder="Search..."
          onChange={handleSearch}
        />
        <button className="order" onClick={handleSort}>
          {sort === "asc" ? "order asc" : "order desc"}
        </button>
      </form>
      <br />
      <VideoAdd />
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
