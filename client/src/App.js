import React, { useState, useEffect } from "react";
import "./styles.css";
import Video from "./Video";
import AddVideo from "./AddVideo";
// import videosData from "./exampleresponse.json";// I comment this line inoder to import data from the server//

function App() {
  const [videos, setVideos] = useState([]);
  const [order, setOrder] = useState("desc"); //Order line desc or asc

  // useEffect(() => {
  //   // Fetch data from the API when the component mounts
  //   fetch("https://full-stack-server-3nzy.onrender.com/videos")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Sort the data based on the order state
  //       const sortedData =
  //         order === "desc"
  //           ? data.sort((a, b) => b.votes - a.votes)
  //           : data.sort((a, b) => a.votes - b.votes);
  //       setVideos(sortedData);
  //     })
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, [order]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://full-stack-server-3nzy.onrender.com/videos"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data from the server");
        }
        const data = await response.json();
        const sortedData =
          order === "desc"
            ? data.sort((a, b) => b.votes - a.votes)
            : data.sort((a, b) => a.votes - b.votes);
        setVideos(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); 
  }, [order]);


  const toggleOrder = () => {
    setOrder(order === "desc" ? "asc" : "desc");
  };

  const handleVote = (id, increment) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === id ? { ...video, votes: video.votes + increment } : video
      )
    );
  };

  // const handleRemove = (id) => {
  //   setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
  // };

    const handleRemove = (id) => {
      // Remove the video from the React state
      setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));

      // Send a DELETE request to the server to delete the video
      fetch(`https://full-stack-server-3nzy.onrender.com/videos/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            console.log(
              `Video with ID ${id} deleted successfully on the server`
            );
          } else {
            console.error(`Error deleting video with ID ${id} on the server`);
          }
        })
        .catch((error) =>
          console.error("Error deleting video on the server:", error)
        );
    };




  // const handleAddVideo = (newVideo) => {
  //   const id = videos.length + 1;
  //   // const currentDate = new Date().toISOString();
  //   setVideos([
  //     ...videos,
  //     // { ...newVideo, id, votes: 0, uploadDate: currentDate },
  //     { ...newVideo, id, votes: 0 },
  //   ]);
  // };
    
const handleAddVideo = (newVideo) => {
  // Send a POST request to add the new video
  fetch("https://full-stack-server-3nzy.onrender.com/videos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newVideo),
  })
    .then((response) => response.json())
    .then((data) => {
      // Include the generated ID in the new video
      const updatedVideo = {
        ...newVideo,
        id: data.id,
        votes: 0,
        uploadDate: data.uploadDate,
      };

      // Add the new video to the list of videos
      setVideos([...videos, updatedVideo]);
    })
    .catch((error) => console.error("Error adding video:", error));
};



  return (
    <div className="App">
      <header className="App-header">
        <h1 className="header-video">Video Recommendation</h1>
        <button onClick={toggleOrder}>
          {order === "desc" ? "Order Ascending" : "Order Descending"}
        </button>
        {videos.map((video) => (
          <Video
            key={video.id}
            video={video}
            onVoteUp={() => handleVote(video.id, 1)}
            onVoteDown={() => handleVote(video.id, -1)}
            onRemove={() => handleRemove(video.id)}
          />
        ))}
        <AddVideo onAddVideo={handleAddVideo} />
      </header>
    </div>
  );
}

export default App;
