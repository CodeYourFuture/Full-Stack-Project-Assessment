import React, { useState } from "react";

const SearchVideo = (prop) => {
  let videos = prop.videos;
  console.log(videos);
  const [videoSearch, setVideoSearch] = useState("");

  const [newVideo, setNewVideo] = useState([{}]);
  const handleChange = (e) => {
    setVideoSearch(e.target.value.toLowerCase());

    
  };


  const searchVideo = () => {
    setNewVideo(
      videos.filter(
        (video) =>
          video.title.toLowerCase().includes(videoSearch) ||
          video.url.toLowerCase().includes(videoSearch)
      )
    );
    prop.onsearch(newVideo)
  }
  return (
    <>
      <form className="addvideo-form" onSubmit={(e) => e.preventDefault()}>
        <div className="addvideo">
          <label htmlFor="title" name="title">
            Search video
            <input
              className="input"
              type="text"
              name="title"
              onChange={(e) => handleChange(e)}
              required
            />
          </label>
        </div>

        <div className="addvideo">
          <button onClick={() => searchVideo()}>Search Video</button>
        </div>
      </form>{" "}
    </>
  );
};

export default SearchVideo;
