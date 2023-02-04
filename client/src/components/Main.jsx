import React, { useState, useEffect } from "react";
import DeleteBtn from "./DeleteBtn";
import VideoAdd from "./VideoAdd";
import Videos from "./Videos";

function Main() {
  const [videos, setVideos] = useState([]);

  const [filtered, setFiltered] = useState(videos);
  useEffect(() => {
    fetch("/videos")
      .then((res) => res.json())
      .then((data) => {
          // data.sort((a, b) => b.rating - a.rating);
        
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
        videos
          .filter((video) =>
            video.video_title.toLowerCase().includes(event.target.value.toLowerCase())
          )
          .sort((a, b) => b.video_rating - a.video_rating)
      );
    }
  };

const handleSort = () => {
  
  setFiltered(videos.sort((b, a) => a.video_rating - b.video_rating));
};
console.log(filtered);
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
