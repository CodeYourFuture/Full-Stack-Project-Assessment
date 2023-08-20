// update10
import React, { useState, useEffect } from "react";
import "./App.css";
import VideoComponent from "./VideoComponent";
import AddYoutubeVideo from "./AddYoutubeVideo";
import axios from "axios";

const App = () => {
  const [videos, setVideos] = useState([]);
  console.log(videos);
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      // const response = await axios.get("http://localhost:5000/videos");
      const response = await axios.get(
        "https://back-end-full-stack-project-assessment.onrender.com/videos"
      );
      console.log("Response from backend:", response.data);
      const sortedVideos = response.data.sort((a, b) => b.rating - a.rating);
      setVideos(sortedVideos);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const handleAddVideo = async (newVideo) => {
    try {
      if (!newVideo.title || !isYouTubeUrlValid(newVideo.url)) {
        alert("Please enter a valid title and YouTube URL.");
        return;
      }

      // const response = await axios.post("http://localhost:5000/videos", {
      const response = await axios.post(
        "https://back-end-full-stack-project-assessment.onrender.com/videos",
        {
          ...newVideo,
          timestamp: new Date().toISOString(),
        }
      );
      newVideo.id = response.data.id;
      setVideos([...videos, newVideo]);
    } catch (error) {
      console.error("Error adding video:", error);
    }
  };

  const handleUpVote = async (id) => {
    try {
      // await axios.post(`http://localhost:5000/videos/${id}/upvote`);
      await axios.post(
        `https://back-end-full-stack-project-assessment.onrender.com/videos/${id}/upvote`
      );
      const updatedVideos = videos.map((video) =>
        video.id === id ? { ...video, rating: video.rating + 1 } : video
      );
      setVideos(updatedVideos.sort((a, b) => b.rating - a.rating));
    } catch (error) {
      console.error("Error upvoting video:", error);
    }
  };

  const handleDownVote = async (id) => {
    try {
      // await axios.post(`http://localhost:5000/videos/${id}/downvote`);
      await axios.post(
        `https://back-end-full-stack-project-assessment.onrender.com/videos/${id}/downvote`
      );
      const updatedVideos = videos.map((video) =>
        video.id === id
          ? { ...video, rating: Math.max(video.rating - 1, 0) }
          : video
      );
      setVideos(updatedVideos.sort((a, b) => b.rating - a.rating));
    } catch (error) {
      console.error("Error downvoting video:", error);
    }
  };

  const handleRemove = async (id) => {
    try {
      // await axios.delete(`http://localhost:5000/videos/${id}`);
      await axios.delete(
        `https://back-end-full-stack-project-assessment.onrender.com/videos/${id}`
      );
      const updatedVideos = videos.filter((video) => video.id !== id);
      setVideos(updatedVideos);
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  const isYouTubeUrlValid = (url) => {
    const youtubeUrlPattern =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/;
    return youtubeUrlPattern.test(url);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        <div className="video-list">
          {videos.map((video) => (
            <VideoComponent
              key={video.id}
              video={video}
              onUpVote={handleUpVote}
              onDownVote={handleDownVote}
              onRemove={handleRemove}
            />
          ))}
        </div>
        <AddYoutubeVideo onAddVideo={handleAddVideo} />
      </header>
    </div>
  );
};

export default App;

// update9 this code works when i had not started do any html and css updates
// import React, { useState, useEffect } from "react";
// import "./App.css";
// import VideoComponent from "./VideoComponent";
// import AddYoutubeVideo from "./AddYoutubeVideo";
// import axios from "axios";

// const App = () => {
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     fetchVideos();
//   }, []);

//   const fetchVideos = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/videos");
//       const sortedVideos = response.data.sort((a, b) => b.rating - a.rating); // Order videos by most upvotes
//       setVideos(sortedVideos);
//     } catch (error) {
//       console.error("Error fetching videos:", error);
//     }
//   };

//   const handleAddVideo = async (newVideo) => {
//     try {
//       if (!newVideo.title || !isYouTubeUrlValid(newVideo.url)) {
//         alert("Please enter a valid title and YouTube URL.");
//         return;
//       }

//       const response = await axios.post("http://localhost:5000/videos", {
//         ...newVideo,
//         timestamp: new Date().toISOString(), // Store the current timestamp
//       });
//       newVideo.id = response.data.id;
//       setVideos([...videos, newVideo]);
//     } catch (error) {
//       console.error("Error adding video:", error);
//     }
//   };

//   const handleUpVote = async (id) => {
//     try {
//       await axios.post(`http://localhost:5000/videos/${id}/upvote`);
//       const updatedVideos = videos.map((video) =>
//         video.id === id ? { ...video, rating: video.rating + 1 } : video
//       );
//       setVideos(updatedVideos.sort((a, b) => b.rating - a.rating)); // Reorder after upvote
//     } catch (error) {
//       console.error("Error upvoting video:", error);
//     }
//   };

//   const handleDownVote = async (id) => {
//     try {
//       await axios.post(`http://localhost:5000/videos/${id}/downvote`);
//       const updatedVideos = videos.map((video) =>
//         video.id === id
//           ? { ...video, rating: Math.max(video.rating - 1, 0) }
//           : video
//       );
//       setVideos(updatedVideos.sort((a, b) => b.rating - a.rating)); // Reorder after downvote
//     } catch (error) {
//       console.error("Error downvoting video:", error);
//     }
//   };

//   const handleRemove = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/videos/${id}`);
//       const updatedVideos = videos.filter((video) => video.id !== id);
//       setVideos(updatedVideos);
//     } catch (error) {
//       console.error("Error deleting video:", error);
//     }
//   };

//   const isYouTubeUrlValid = (url) => {
//     const youtubeUrlPattern =
//       /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/;
//     return youtubeUrlPattern.test(url);
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Video Recommendation</h1>
//         <div className="video-list">
//           {videos.map((video) => (
//             <VideoComponent
//               key={video.id}
//               video={video}
//               onUpVote={handleUpVote}
//               onDownVote={handleDownVote}
//               onRemove={handleRemove}
//             />
//           ))}
//         </div>
//         <AddYoutubeVideo onAddVideo={handleAddVideo} />
//       </header>
//     </div>
//   );
// };

// export default App;

// update8
// import React, { useState, useEffect } from "react";
// import "./App.css";
// import VideoComponent from "./VideoComponent";
// import AddYoutubeVideo from "./AddYoutubeVideo";
// import axios from "axios";

// const App = () => {
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     fetchVideos();
//   }, []);

//   const fetchVideos = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/videos"); // Updated the URL
//       setVideos(response.data);
//     } catch (error) {
//       console.error("Error fetching videos:", error);
//     }
//   };

//   const handleAddVideo = async (newVideo) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/videos",
//         newVideo
//       ); // Updated the URL
//       newVideo.id = response.data.id;
//       setVideos([...videos, newVideo]);
//     } catch (error) {
//       console.error("Error adding video:", error);
//     }
//   };

//   const handleUpVote = async (id) => {
//     try {
//       await axios.post(`http://localhost:5000/videos/${id}/upvote`); // Updated the URL
//       const updatedVideos = videos.map((video) =>
//         video.id === id ? { ...video, rating: video.rating + 1 } : video
//       );
//       setVideos(updatedVideos);
//     } catch (error) {
//       console.error("Error upvoting video:", error);
//     }
//   };

//   const handleDownVote = async (id) => {
//     try {
//       await axios.post(`http://localhost:5000/videos/${id}/downvote`); // Updated the URL
//       const updatedVideos = videos.map((video) =>
//         video.id === id
//           ? { ...video, rating: Math.max(video.rating - 1, 0) }
//           : video
//       );
//       setVideos(updatedVideos);
//     } catch (error) {
//       console.error("Error downvoting video:", error);
//     }
//   };

//   const handleRemove = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/videos/${id}`); // Updated the URL
//       const updatedVideos = videos.filter((video) => video.id !== id);
//       setVideos(updatedVideos);
//     } catch (error) {
//       console.error("Error deleting video:", error);
//     }
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Video Recommendation</h1>
//         <div className="video-list">
//           {videos.map((video) => (
//             <VideoComponent
//               key={video.id}
//               video={video}
//               onUpVote={handleUpVote}
//               onDownVote={handleDownVote}
//               onRemove={handleRemove}
//             />
//           ))}
//         </div>
//         <AddYoutubeVideo onAddVideo={handleAddVideo} />
//       </header>
//     </div>
//   );
// };

// export default App;

// update7
// import React, { useState, useEffect } from "react";
// import "./App.css";
// import VideoComponent from "./VideoComponent";
// import AddYoutubeVideo from "./AddYoutubeVideo";
// import axios from "axios";

// const App = () => {
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     fetchVideos();
//   }, []);

//   const fetchVideos = async () => {
//     try {
//       const response = await axios.get("/localhost:5000/videos"); // Make a GET request to fetch videos
//       setVideos(response.data);
//     } catch (error) {
//       console.error("Error fetching videos:", error);
//     }
//   };

//   const handleAddVideo = async (newVideo) => {
//     try {
//       const response = await axios.post("/videos", newVideo); // Make a POST request to add a video
//       newVideo.id = response.data.id;
//       setVideos([...videos, newVideo]);
//     } catch (error) {
//       console.error("Error adding video:", error);
//     }
//   };

//   const handleUpVote = async (id) => {
//     try {
//       await axios.post(`/videos/${id}/upvote`); // Make a POST request to upvote a video
//       const updatedVideos = videos.map((video) =>
//         video.id === id ? { ...video, rating: video.rating + 1 } : video
//       );
//       setVideos(updatedVideos);
//     } catch (error) {
//       console.error("Error upvoting video:", error);
//     }
//   };

//   const handleDownVote = async (id) => {
//     try {
//       await axios.post(`/videos/${id}/downvote`); // Make a POST request to downvote a video
//       const updatedVideos = videos.map((video) =>
//         video.id === id
//           ? { ...video, rating: Math.max(video.rating - 1, 0) }
//           : video
//       );
//       setVideos(updatedVideos);
//     } catch (error) {
//       console.error("Error downvoting video:", error);
//     }
//   };

//   const handleRemove = async (id) => {
//     try {
//       await axios.delete(`/videos/${id}`); // Make a DELETE request to remove a video
//       const updatedVideos = videos.filter((video) => video.id !== id);
//       setVideos(updatedVideos);
//     } catch (error) {
//       console.error("Error deleting video:", error);
//     }
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Video Recommendation</h1>
//         <div className="video-list">
//           {videos.map((video) => (
//             <VideoComponent
//               key={video.id}
//               video={video}
//               onUpVote={handleUpVote}
//               onDownVote={handleDownVote}
//               onRemove={handleRemove}
//             />
//           ))}
//         </div>
//         <AddYoutubeVideo onAddVideo={handleAddVideo} />{" "}
//         {/* Use the updated component */}
//       </header>
//     </div>
//   );
// };

// export default App;

// update6 - this version work with no axios
// import React, { useState } from "react";
// import "./App.css";
// import VideoComponent from "./VideoComponent";
// import AddYoutubeVideo from "./AddYoutubeVideo";

// const videoData = [
//   // Copy and paste the data from exampleresponse.json here
//   // Make sure to preserve the structure of each video object
//   {
//     id: 523523,
//     title: "Never Gonna Give You Up",
//     url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//     rating: 23,
//   },
//   {
//     id: 523427,
//     title: "The Coding Train",
//     url: "https://www.youtube.com/watch?v=HerCR8bw_GE",
//     rating: 230,
//   },
//   {
//     id: 82653,
//     title: "Mac & Cheese | Basics with Babish",
//     url: "https://www.youtube.com/watch?v=FUeyrEN14Rk",
//     rating: 2111,
//   },
//   {
//     id: 858566,
//     title: "Videos for Cats to Watch - 8 Hour Bird Bonanza",
//     url: "https://www.youtube.com/watch?v=xbs7FT7dXYc",
//     rating: 11,
//   },
//   {
//     id: 453538,
//     title:
//       "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
//     url: "https://www.youtube.com/watch?v=4As0e4de-rI",
//     rating: 3211,
//   },
//   {
//     id: 283634,
//     title: "Learn Unity - Beginner's Game Development Course",
//     url: "https://www.youtube.com/watch?v=gB1F9G0JXOo",
//     rating: 211,
//   },
//   {
//     id: 562824,
//     title: "Cracking Enigma in 2021 - Computerphile",
//     url: "https://www.youtube.com/watch?v=RzWB5jL5RX0",
//     rating: 111,
//   },
//   {
//     id: 442452,
//     title: "Coding Adventure: Chess AI",
//     url: "https://www.youtube.com/watch?v=U4ogK0MIzqk",
//     rating: 671,
//   },
//   {
//     id: 536363,
//     title: "Coding Adventure: Ant and Slime Simulations",
//     url: "https://www.youtube.com/watch?v=X-iSQQgOd1A",
//     rating: 76,
//   },
//   {
//     id: 323445,
//     title: "Why the Tour de France is so brutal",
//     url: "https://www.youtube.com/watch?v=ZacOS8NBK6U",
//     rating: 73,
//   },
// ];

// function App() {
//   const [videos, setVideos] = useState(videoData);

//   const handleUpVote = (id) => {
//     setVideos((prevVideos) =>
//       prevVideos.map((video) =>
//         video.id === id ? { ...video, rating: video.rating + 1 } : video
//       )
//     );
//   };

//   const handleDownVote = (id) => {
//     setVideos((prevVideos) =>
//       prevVideos.map((video) =>
//         video.id === id
//           ? { ...video, rating: Math.max(video.rating - 1, 0) }
//           : video
//       )
//     );
//   };

//   const handleRemove = (id) => {
//     setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
//   };

//   const handleAddVideo = (newVideo) => {
//     setVideos((prevVideos) => [...prevVideos, newVideo]);
//   };

//   const sortedVideos = [...videos].sort((a, b) => b.rating - a.rating);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Video Recommendation</h1>
//         <div className="video-list">
//           {sortedVideos.map((video) => (
//             <VideoComponent
//               key={video.id}
//               video={video}
//               onUpVote={handleUpVote}
//               onDownVote={handleDownVote}
//               onRemove={handleRemove}
//             />
//           ))}
//         </div>
//         <AddYoutubeVideo onAddVideo={handleAddVideo} />
//       </header>
//     </div>
//   );
// }

// export default App;

// update5
// import React, { useState } from "react";
// import "./App.css";
// import VideoComponent from "./VideoComponent";
// import AddYoutubeVideo from "./AddYoutubeVideo";

// const videoData = [
//   // Copy and paste the data from exampleresponse.json here
//   // Make sure to preserve the structure of each video object
//   {
//     id: 523523,
//     title: "Never Gonna Give You Up",
//     url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//     rating: 23,
//   },
//   {
//     id: 523427,
//     title: "The Coding Train",
//     url: "https://www.youtube.com/watch?v=HerCR8bw_GE",
//     rating: 230,
//   },
//   {
//     id: 82653,
//     title: "Mac & Cheese | Basics with Babish",
//     url: "https://www.youtube.com/watch?v=FUeyrEN14Rk",
//     rating: 2111,
//   },
//   {
//     id: 858566,
//     title: "Videos for Cats to Watch - 8 Hour Bird Bonanza",
//     url: "https://www.youtube.com/watch?v=xbs7FT7dXYc",
//     rating: 11,
//   },
//   {
//     id: 453538,
//     title:
//       "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
//     url: "https://www.youtube.com/watch?v=4As0e4de-rI",
//     rating: 3211,
//   },
//   {
//     id: 283634,
//     title: "Learn Unity - Beginner's Game Development Course",
//     url: "https://www.youtube.com/watch?v=gB1F9G0JXOo",
//     rating: 211,
//   },
//   {
//     id: 562824,
//     title: "Cracking Enigma in 2021 - Computerphile",
//     url: "https://www.youtube.com/watch?v=RzWB5jL5RX0",
//     rating: 111,
//   },
//   {
//     id: 442452,
//     title: "Coding Adventure: Chess AI",
//     url: "https://www.youtube.com/watch?v=U4ogK0MIzqk",
//     rating: 671,
//   },
//   {
//     id: 536363,
//     title: "Coding Adventure: Ant and Slime Simulations",
//     url: "https://www.youtube.com/watch?v=X-iSQQgOd1A",
//     rating: 76,
//   },
//   {
//     id: 323445,
//     title: "Why the Tour de France is so brutal",
//     url: "https://www.youtube.com/watch?v=ZacOS8NBK6U",
//     rating: 73,
//   },
// ];

// function App() {
//   const [videos, setVideos] = useState(videoData);

//   const handleUpVote = (id) => {
//     setVideos((prevVideos) =>
//       prevVideos.map((video) =>
//         video.id === id ? { ...video, rating: video.rating + 1 } : video
//       )
//     );
//   };

//   const handleDownVote = (id) => {
//     setVideos((prevVideos) =>
//       prevVideos.map((video) =>
//         video.id === id
//           ? { ...video, rating: Math.max(video.rating - 1, 0) }
//           : video
//       )
//     );
//   };

//   const handleRemove = (id) => {
//     setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
//   };

//   const handleAddVideo = (newVideo) => {
//     setVideos((prevVideos) => [...prevVideos, newVideo]);
//   };

//   // Sort the videos based on the rating (number of upvotes) in descending order
//   const sortedVideos = [...videos].sort((a, b) => b.rating - a.rating);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Video Recommendation</h1>
//         <div className="video-list">
//           {sortedVideos.map((video) => (
//             <VideoComponent
//               key={video.id}
//               video={video}
//               onUpVote={handleUpVote}
//               onDownVote={handleDownVote}
//               onRemove={handleRemove}
//             />
//           ))}
//         </div>
//         <AddYoutubeVideo onAddVideo={handleAddVideo} />
//       </header>
//     </div>
//   );
// }

// export default App;

// update4
// import React, { useState } from "react";
// import "./App.css";
// import VideoComponent from "./VideoComponent";
// import AddYoutubeVideo from "./AddYoutubeVideo";

// const videoData = [
//   // Copy and paste the data from exampleresponse.json here
//   // Make sure to preserve the structure of each video object

//   {
//     id: 523523,
//     title: "Never Gonna Give You Up",
//     url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//     rating: 23,
//   },
//   {
//     id: 523427,
//     title: "The Coding Train",
//     url: "https://www.youtube.com/watch?v=HerCR8bw_GE",
//     rating: 230,
//   },
//   {
//     id: 82653,
//     title: "Mac & Cheese | Basics with Babish",
//     url: "https://www.youtube.com/watch?v=FUeyrEN14Rk",
//     rating: 2111,
//   },
//   {
//     id: 858566,
//     title: "Videos for Cats to Watch - 8 Hour Bird Bonanza",
//     url: "https://www.youtube.com/watch?v=xbs7FT7dXYc",
//     rating: 11,
//   },
//   {
//     id: 453538,
//     title:
//       "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
//     url: "https://www.youtube.com/watch?v=4As0e4de-rI",
//     rating: 3211,
//   },
//   {
//     id: 283634,
//     title: "Learn Unity - Beginner's Game Development Course",
//     url: "https://www.youtube.com/watch?v=gB1F9G0JXOo",
//     rating: 211,
//   },
//   {
//     id: 562824,
//     title: "Cracking Enigma in 2021 - Computerphile",
//     url: "https://www.youtube.com/watch?v=RzWB5jL5RX0",
//     rating: 111,
//   },
//   {
//     id: 442452,
//     title: "Coding Adventure: Chess AI",
//     url: "https://www.youtube.com/watch?v=U4ogK0MIzqk",
//     rating: 671,
//   },
//   {
//     id: 536363,
//     title: "Coding Adventure: Ant and Slime Simulations",
//     url: "https://www.youtube.com/watch?v=X-iSQQgOd1A",
//     rating: 76,
//   },
//   {
//     id: 323445,
//     title: "Why the Tour de France is so brutal",
//     url: "https://www.youtube.com/watch?v=ZacOS8NBK6U",
//     rating: 73,
//   },
// ];

// function App() {
//   const [videos, setVideos] = useState(videoData);

//   const handleUpVote = (id) => {
//     setVideos((prevVideos) =>
//       prevVideos.map((video) =>
//         video.id === id ? { ...video, rating: video.rating + 1 } : video
//       )
//     );
//   };

//   const handleDownVote = (id) => {
//     setVideos((prevVideos) =>
//       prevVideos.map((video) =>
//         video.id === id
//           ? { ...video, rating: Math.max(video.rating - 1, 0) }
//           : video
//       )
//     );
//   };

//   const handleRemove = (id) => {
//     setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
//   };

//   const handleAddVideo = (newVideo) => {
//     setVideos((prevVideos) => [...prevVideos, newVideo]);
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Video Recommendation</h1>
//         <div className="video-list">
//           {videos.map((video) => (
//             <VideoComponent
//               key={video.id}
//               video={video}
//               onUpVote={handleUpVote}
//               onDownVote={handleDownVote}
//               onRemove={handleRemove}
//             />
//           ))}
//         </div>
//         <AddYoutubeVideo onAddVideo={handleAddVideo} />
//       </header>
//     </div>
//   );
// }

// export default App;

// update3
// import React, { useState } from "react";
// import "./App.css";
// import VideoComponent from "./VideoComponent"; // Import the VideoComponent component

// const videoData = [
//   // Copy and paste the data from exampleresponse.json here
//   // Make sure to preserve the structure of each video object

//   {
//     id: 523523,
//     title: "Never Gonna Give You Up",
//     url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//     rating: 23,
//   },
//   {
//     id: 523427,
//     title: "The Coding Train",
//     url: "https://www.youtube.com/watch?v=HerCR8bw_GE",
//     rating: 230,
//   },
//   {
//     id: 82653,
//     title: "Mac & Cheese | Basics with Babish",
//     url: "https://www.youtube.com/watch?v=FUeyrEN14Rk",
//     rating: 2111,
//   },
//   {
//     id: 858566,
//     title: "Videos for Cats to Watch - 8 Hour Bird Bonanza",
//     url: "https://www.youtube.com/watch?v=xbs7FT7dXYc",
//     rating: 11,
//   },
//   {
//     id: 453538,
//     title:
//       "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
//     url: "https://www.youtube.com/watch?v=4As0e4de-rI",
//     rating: 3211,
//   },
//   {
//     id: 283634,
//     title: "Learn Unity - Beginner's Game Development Course",
//     url: "https://www.youtube.com/watch?v=gB1F9G0JXOo",
//     rating: 211,
//   },
//   {
//     id: 562824,
//     title: "Cracking Enigma in 2021 - Computerphile",
//     url: "https://www.youtube.com/watch?v=RzWB5jL5RX0",
//     rating: 111,
//   },
//   {
//     id: 442452,
//     title: "Coding Adventure: Chess AI",
//     url: "https://www.youtube.com/watch?v=U4ogK0MIzqk",
//     rating: 671,
//   },
//   {
//     id: 536363,
//     title: "Coding Adventure: Ant and Slime Simulations",
//     url: "https://www.youtube.com/watch?v=X-iSQQgOd1A",
//     rating: 76,
//   },
//   {
//     id: 323445,
//     title: "Why the Tour de France is so brutal",
//     url: "https://www.youtube.com/watch?v=ZacOS8NBK6U",
//     rating: 73,
//   },
// ];

// function App() {
//   const [videos, setVideos] = useState(videoData);

//   const handleUpVote = (id) => {
//     setVideos((prevVideos) =>
//       prevVideos.map((video) =>
//         video.id === id ? { ...video, rating: video.rating + 1 } : video
//       )
//     );
//   };

//   const handleDownVote = (id) => {
//     setVideos((prevVideos) =>
//       prevVideos.map((video) =>
//         video.id === id
//           ? { ...video, rating: Math.max(video.rating - 1, 0) }
//           : video
//       )
//     );
//   };

//   const handleRemove = (id) => {
//     setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Video Recommendation</h1>
//         <div className="video-list">
//           {videos.map((video) => (
//             <VideoComponent
//               key={video.id}
//               video={video}
//               onUpVote={handleUpVote}
//               onDownVote={handleDownVote}
//               onRemove={handleRemove}
//             />
//           ))}
//         </div>
//       </header>
//     </div>
//   );
// }

// export default App;

// Update2

// import React, { useState } from "react";
// import "./App.css";

// const videoData = [
//   {
//     id: 523523,
//     title: "Never Gonna Give You Up",
//     url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//     rating: 23,
//   },
//   {
//     id: 523427,
//     title: "The Coding Train",
//     url: "https://www.youtube.com/watch?v=HerCR8bw_GE",
//     rating: 230,
//   },
//   {
//     id: 82653,
//     title: "Mac & Cheese | Basics with Babish",
//     url: "https://www.youtube.com/watch?v=FUeyrEN14Rk",
//     rating: 2111,
//   },
//   {
//     id: 858566,
//     title: "Videos for Cats to Watch - 8 Hour Bird Bonanza",
//     url: "https://www.youtube.com/watch?v=xbs7FT7dXYc",
//     rating: 11,
//   },
//   {
//     id: 453538,
//     title:
//       "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
//     url: "https://www.youtube.com/watch?v=4As0e4de-rI",
//     rating: 3211,
//   },
//   {
//     id: 283634,
//     title: "Learn Unity - Beginner's Game Development Course",
//     url: "https://www.youtube.com/watch?v=gB1F9G0JXOo",
//     rating: 211,
//   },
//   {
//     id: 562824,
//     title: "Cracking Enigma in 2021 - Computerphile",
//     url: "https://www.youtube.com/watch?v=RzWB5jL5RX0",
//     rating: 111,
//   },
//   {
//     id: 442452,
//     title: "Coding Adventure: Chess AI",
//     url: "https://www.youtube.com/watch?v=U4ogK0MIzqk",
//     rating: 671,
//   },
//   {
//     id: 536363,
//     title: "Coding Adventure: Ant and Slime Simulations",
//     url: "https://www.youtube.com/watch?v=X-iSQQgOd1A",
//     rating: 76,
//   },
//   {
//     id: 323445,
//     title: "Why the Tour de France is so brutal",
//     url: "https://www.youtube.com/watch?v=ZacOS8NBK6U",
//     rating: 73,
//   },
// ];

// function VideoComponent({ video, onVote, onRemove }) {
//   return (
//     <div className="video-component">
//       <h2>{video.title}</h2>
//       <iframe
//         title={video.title}
//         width="560"
//         height="315"
//         src={`https://www.youtube.com/embed/${video.url.split("v=")[1]}`}
//         frameBorder="0"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//         allowFullScreen
//       ></iframe>
//       <p>Votes: {video.rating}</p>
//       <button onClick={() => onVote(video.id)}>Vote</button>
//       <button onClick={() => onRemove(video.id)}>Remove</button>
//     </div>
//   );
// }

// function App() {
//   const [videos, setVideos] = useState(videoData);

//   const handleVote = (id) => {
//     setVideos((prevVideos) =>
//       prevVideos.map((video) =>
//         video.id === id ? { ...video, rating: video.rating + 1 } : video
//       )
//     );
//   };

//   const handleRemove = (id) => {
//     setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Video Recommendation</h1>
//         <div className="video-list">
//           {videos.map((video) => (
//             <VideoComponent
//               key={video.id}
//               video={video}
//               onVote={handleVote}
//               onRemove={handleRemove}
//             />
//           ))}
//         </div>
//       </header>
//     </div>
//   );
// }

// export default App;

// Update 1
// import React from "react";
// import "./App.css";

// const videoData = [
//   {
//     id: 523523,
//     title: "Never Gonna Give You Up",
//     url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//     rating: 23,
//   },
//   {
//     id: 523427,
//     title: "The Coding Train",
//     url: "https://www.youtube.com/watch?v=HerCR8bw_GE",
//     rating: 230,
//   },
//   {
//     id: 82653,
//     title: "Mac & Cheese | Basics with Babish",
//     url: "https://www.youtube.com/watch?v=FUeyrEN14Rk",
//     rating: 2111,
//   },
//   {
//     id: 858566,
//     title: "Videos for Cats to Watch - 8 Hour Bird Bonanza",
//     url: "https://www.youtube.com/watch?v=xbs7FT7dXYc",
//     rating: 11,
//   },
//   {
//     id: 453538,
//     title:
//       "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
//     url: "https://www.youtube.com/watch?v=4As0e4de-rI",
//     rating: 3211,
//   },
//   {
//     id: 283634,
//     title: "Learn Unity - Beginner's Game Development Course",
//     url: "https://www.youtube.com/watch?v=gB1F9G0JXOo",
//     rating: 211,
//   },
//   {
//     id: 562824,
//     title: "Cracking Enigma in 2021 - Computerphile",
//     url: "https://www.youtube.com/watch?v=RzWB5jL5RX0",
//     rating: 111,
//   },
//   {
//     id: 442452,
//     title: "Coding Adventure: Chess AI",
//     url: "https://www.youtube.com/watch?v=U4ogK0MIzqk",
//     rating: 671,
//   },
//   {
//     id: 536363,
//     title: "Coding Adventure: Ant and Slime Simulations",
//     url: "https://www.youtube.com/watch?v=X-iSQQgOd1A",
//     rating: 76,
//   },
//   {
//     id: 323445,
//     title: "Why the Tour de France is so brutal",
//     url: "https://www.youtube.com/watch?v=ZacOS8NBK6U",
//     rating: 73,
//   },
// ];

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Video Recommendation</h1>
//         <ul>
//           {videoData.map((video) => (
//             <li key={video.id}>
//               <a href={video.url} target="_blank" rel="noopener noreferrer">
//                 {video.title}
//               </a>
//             </li>
//           ))}
//         </ul>
//       </header>
//     </div>
//   );
// }

// export default App;

// original
// import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Video Recommendation</h1>
//       </header>
//     </div>
//   );
// }

// export default App;
