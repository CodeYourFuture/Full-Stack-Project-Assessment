import React, { useState } from "react";

const SearchVideo = (prop) => {
  let videos = prop.videos;
  
  const [videoSearch, setVideoSearch] = useState("");

  
  const handleChange = (e) => {
    setVideoSearch(e.target.value.toLowerCase());
  };
  

  let result = videos.filter((video) => {
    return (
      video.title.toLowerCase().includes(videoSearch) ||
      video.url.toLowerCase().includes(videoSearch)
    )
     
  });

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
          <button onClick={() => prop.onsearch(result)}>Search Video</button>
        </div>
      </form>{" "}
    </>
  );
};

export default SearchVideo;
