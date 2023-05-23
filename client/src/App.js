// import React, { useState } from "react";
// import VideoList from "./components/VideoList";
// import AddVideoForm from "./components/AddVideoForm";
// import "./App.css";

// function extractVideoId(url) {
//   // Extract the video ID from the YouTube URL
//   // Implement this function according to your requirements
//   // Example implementation:
//   const urlParts = url.split("/");
//   return urlParts[urlParts.length - 1];
// }

// function App() {
//   const [videos, setVideos] = useState([
//     {
//       id: 1,
//       title: "Video 1",
//       url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
//       votes: 0,
//     },
//     {
//       id: 2,
//       title: "Video 2",
//       url: "https://www.youtube.com/embed/K4DyBUG242c",
//       votes: 0,
//     },
//     {
//       id: 3,
//       title: "Video 3",
//       url: "https://www.youtube.com/embed/tgbNymZ7vqY",
//       votes: 0,
//     },
//   ]);

//   const handleAddVideo = (title, url) => {
//     const videoId = extractVideoId(url);
//     const newVideo = {
//       id: videos.length + 1,
//       title,
//       url: `https://www.youtube.com/embed/${videoId}`,
//       votes: 0,
//     };
//     setVideos([...videos, newVideo]);
//   };

//   const handleVote = (videoId, increment) => {
//     setVideos((prevVideos) =>
//       prevVideos.map((video) =>
//         video.id === videoId
//           ? { ...video, votes: video.votes + increment }
//           : video
//       )
//     );
//   };

//   const handleRemoveVideo = (videoId) => {
//     setVideos((prevVideos) =>
//       prevVideos.filter((video) => video.id !== videoId)
//     );
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Video Recommendation</h1>
//       </header>
//       <div className="container">
//         <VideoList
//           videos={videos}
//           handleVote={handleVote}
//           handleRemove={handleRemoveVideo}
//         />
//         <AddVideoForm handleAddVideo={handleAddVideo} />
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
import VideoList from "./components/VideoList";
import AddVideoForm from "./components/AddVideoForm";

const App = () => {
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: "Default Video 1",
      url: "https://www.youtube.com/embed/default_video_1",
      votes: 0,
    },
    {
      id: 2,
      title: "Default Video 2",
      url: "https://www.youtube.com/embed/default_video_2",
      votes: 0,
    },
  ]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/")
      .then((response) => response.json())
      .then((data) => {
        setVideos(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleAddVideo = (title, url) => {
    const video = {
      title: title,
      url: url,
    };

    fetch("http://127.0.0.1:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(video),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          // Video added successfully
          const newVideo = { id: data.id, title: title, url: url };
          setVideos([...videos, newVideo]);
        } else {
          // Failed to add video
          console.error(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Video Website</h1>
      <VideoList videos={videos} />
      <AddVideoForm handleAddVideo={handleAddVideo} />
    </div>
  );
};

export default App;
