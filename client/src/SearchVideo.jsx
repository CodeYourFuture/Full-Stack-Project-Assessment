import React, { useState } from "react";
import moment from "moment";

const SearchVideo = ({onSearch}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        placeholder="Search videos"
        variant="outlined"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};


// function SearchVideo({ videos, searchTerm }) {
//   const [searchTerm, setSearchterm] = useState("");
//   const [searchedVideos, setSearchedVideos] = useState([]);

//   const handleSearch = (e) => {
//     setSearchterm(e.target.value);
//     setSearchedVideos(videos, searchTerm);
//   };

//   const searchVideos = ({videos,}) => {
//     return videos.filtered((video) => {
//       return video.title.toLowerCase().includes(videos.toLowerCase());
//     });
//   };
//   return (
//     <div className="Search videos">
//       <input
//         type="text"
//         placeholder="Search for videos..."
//         value={searchTerm}
//         onChange={handleSearch}
//       />
//       <ul>
//         {searchedVideos.map((video) => (
//           <li key={video.id}>{video.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

export default SearchVideo;
