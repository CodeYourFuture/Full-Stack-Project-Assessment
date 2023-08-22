import React, { useState } from "react";

function SearchVideo({ videos }) {
  const [searchTerm, setSearchterm] = useState("");
  const [searchedVideos, setSearchedVideos] = useState([]);

  const handleSearch = (e) => {
    setSearchterm(e.target.value);
    setSearchedVideos(searchVideos(videos, searchTerm));
  };

  const searchVideos = (videos, searchTerm) => {
    return videos.filtered((video) => {
      return video.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  };
  return (
    <div className="Search videos">
      <input
        type="text"
        placeholder="Search for videos..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {searchedVideos.map((video) => (
          <li key={video.id}>{video.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchVideo;
