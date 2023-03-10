// import React from "react";
// import videos from "./exampleresponse.json";
// import Video from "./Video";
// import "./App.css";

// const App = () => {
//   return (
//     <div className="main-container">
//       <h1>video Recomendation</h1>

//       <div className="video-container">
//         {videos.map((video) => {
//           let url = video.url.split("v=")[1];
//           return <Video title={video.title} rating={video.rating} url={url} />;
//         })}
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useState } from "react";
import videos from "./exampleresponse.json";
import Video from "./Video";
import "./App.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [videoList, setVideoList] = useState(videos);

  const handleThumbUp = (index) => {
    const newVideos = [...videoList];
    newVideos[index].rating += 1;
    setVideoList(newVideos);
  };

  const handleThumbDown = (index) => {
    const newVideos = [...videoList];
    if (newVideos[index].rating > 0) {
      newVideos[index].rating -= 1;
      setVideoList(newVideos);
    }
  };

  const handleDelete = (index) => {
    const newVideos = [...videoList];
    newVideos.splice(index, 1);
    setVideoList(newVideos);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredVideos = videoList.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-container">
      <h1>Video Recommendations</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a video..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="video-container">
        {filteredVideos.map((video, index) => {
          let url = video.url.split("v=")[1];
          return (
            <Video
              key={video.id}
              title={video.title}
              rating={video.rating}
              url={url}
              onThumbUp={() => handleThumbUp(index)}
              onThumbDown={() => handleThumbDown(index)}
              onDelete={() => handleDelete(index)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
