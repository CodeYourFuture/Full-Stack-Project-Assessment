// // import { useState } from "react";

// // function Addvideo() {
// //   const [videos, setVideos] = useState([]);
// //   const [newVideo, setNewVideo] = useState({ title: "", url: "" });
// //   const [idCounter, setIdCounter] = useState(1);

// //   const handleInputChange = (event) => {
// //     const { name, value } = event.target;
// //     setNewVideo({ ...newVideo, [name]: value });
// //   };

// //   const getYouTubeVideoId = (url) => {
// //     const videoIdMatch = url.match(/(?:\/|v=)([A-Za-z0-9_-]{11})(?=&|$)/);
// //     if (videoIdMatch) {
// //       return videoIdMatch[1];
// //     }
// //     return alert("link is not valid");
// //   };

// //   const addVideo = () => {
// //     if (newVideo.title && newVideo.url) {
// //       const videoId = getYouTubeVideoId(newVideo.url);

// //       if (videoId) {
// //         const videoToAdd = {
// //           ...newVideo,
// //           rating: 0,
// //           id: idCounter,
// //           timestamp: new Date().toISOString(),
// //         };
// //         setVideos([...videos, videoToAdd]);
// //         setNewVideo({ title: "", url: "" });
// //         setIdCounter(idCounter + 1);
// //       } else {
// //         alert("Invalid YouTube URL. Please enter a valid YouTube video URL.");
// //       }
// //     }
// //   };

// //   const upvoteVideo = (id) => {
// //     const updatedVideos = videos.map((video) =>
// //       video.id === id ? { ...video, rating: video.rating + 1 } : video
// //     );
// //     setVideos(updatedVideos);
// //   };

// //   const downvoteVideo = (id) => {
// //     const updatedVideos = videos.map((video) =>
// //       video.id === id && video.rating > 0
// //         ? { ...video, rating: video.rating - 1 }
// //         : video
// //     );
// //     setVideos(updatedVideos);
// //   };

// //   const removeVideo = (id) => {
// //     const updatedVideos = videos.filter((video) => video.id !== id);
// //     setVideos(updatedVideos);
// //   };

// //   return (
// //     <>
// //       <div>
// //         <h2>Add a Video</h2>
// //         <input
// //           type="text"
// //           name="title"
// //           placeholder="Title"
// //           value={newVideo.title}
// //           onChange={handleInputChange}
// //         />
// //         <input
// //           type="text"
// //           name="url"
// //           placeholder="URL"
// //           value={newVideo.url}
// //           onChange={handleInputChange}
// //         />
// //         <button onClick={addVideo}>Add Video</button>
// //       </div>
// //       <div>
// //         <h2>Videos</h2>
// //         <ul className="ShowingVideos">
// //           {videos.map((video) => (
// //             <div className="videos" key={video.id}>
// //               <li>
// //                 <h3>{video.title}</h3>
// //                 <div className="buttons">
// //                   <i
// //                     className="fa-solid fa-thumbs-up"
// //                     onClick={() => upvoteVideo(video.id)}
// //                   ></i>
// //                   <h4>{video.rating}</h4>
// //                   <i
// //                     className="fa-solid fa-thumbs-down"
// //                     onClick={() => downvoteVideo(video.id)}
// //                   ></i>
// //                 </div>
// //                 <iframe
// //                   className="allVideos"
// //                   title={video.title}
// //                   width="560"
// //                   height="315"
// //                   src={`https://www.youtube.com/embed/${getYouTubeVideoId(
// //                     video.url
// //                   )}`}
// //                   frameBorder="0"
// //                   allowFullScreen
// //                 ></iframe>
// //                 <p>Posted at: {new Date(video.timestamp).toLocaleString()}</p>

// //                 <button onClick={() => removeVideo(video.id)}>Delete</button>
// //               </li>
// //             </div>
// //           ))}
// //         </ul>
// //       </div>
// //     </>
// //   );
// // }

// // export default Addvideo;

// import React, { useState, useEffect } from "react";

// function ShowingVideos() {
//   const [videos, setVideos] = useState([]);
//   const [orderBy, setOrderBy] = useState("desc");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "https://node-js-full-stack-project-assessment.onrender.com/videos"
//         );
//         if (response.ok) {
//           const data = await response.json();
//           setVideos(data);
//         } else {
//           console.error("Failed to fetch data:", response.statusText);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []); // Empty dependency array to fetch data only once when the component mounts

//   const toggleOrder = () => {
//     setOrderBy(orderBy === "asc" ? "desc" : "asc");
//   };

//   const convertToEmbedUrl = (url) => {
//     const videoId = url.split("v=")[1];
//     return `https://www.youtube.com/embed/${videoId}`;
//   };

//   const deleteVideo = async (id) => {
//     try {
//       const response = await fetch(
//         `https://node-js-full-stack-project-assessment.onrender.com/videos/${id}`,
//         {
//           method: "DELETE",
//         }
//       );

//       if (response.ok) {
//         setVideos((prevVideos) =>
//           prevVideos.filter((video) => video.id !== id)
//         );
//       } else {
//         console.error("Failed to delete video:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error deleting video:", error);
//     }
//   };

//   const handleRating = async (id, type) => {
//     try {
//       const response = await fetch(
//         `https://node-js-full-stack-project-assessment.onrender.com/rate/${id}/${type}`,
//         {
//           method: "PUT",
//         }
//       );

//       if (response.ok) {
//         const updatedRating = await response.json();
//         setVideos((prevVideos) =>
//           prevVideos.map((video) =>
//             video.id === id ? { ...video, rating: updatedRating.rating } : video
//           )
//         );
//       } else {
//         console.error("Failed to update rating:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error updating rating:", error);
//     }
//   };

//   const sortedVideos = [...videos].sort((a, b) => {
//     if (orderBy === "asc") {
//       return a.rating - b.rating;
//     } else {
//       return b.rating - a.rating;
//     }
//   });

//   return (
//     <div className="ShowingVideos">
//       <button onClick={toggleOrder} className="Ordes">
//         {orderBy === "asc" ? "Order Ascending" : "Order Descending"}
//       </button>

//       {sortedVideos.map((video) => (
//         <div className="videos" key={video.id}>
//           <p>{video.title}</p>
//           <div className="buttons">
//             <i
//               className="fa-solid fa-thumbs-up"
//               onClick={() => handleRating(video.id, "up")}
//             ></i>
//             <h4>{video.rating}</h4>
//             <i
//               className="fa-solid fa-thumbs-down"
//               onClick={() => handleRating(video.id, "down")}
//             ></i>
//           </div>

//           <iframe
//             className="allVideos"
//             width="300"
//             height="220"
//             src={convertToEmbedUrl(video.url)}
//             title={video.title}
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//           ></iframe>
//           <button onClick={() => deleteVideo(video.id)}>Delete</button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ShowingVideos;

import React, { useState, useEffect } from "react";

function Addvideo() {
  const [videos, setVideos] = useState([]);
  const [newVideo, setNewVideo] = useState({ title: "", url: "" });
  const [idCounter, setIdCounter] = useState(1);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch(
        "https://node-server-full-stack.onrender.com/videos"
      );
      if (response.ok) {
        const data = await response.json();
        setVideos(data);
      } else {
        console.error("Failed to fetch videos:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewVideo({ ...newVideo, [name]: value });
  };

  const getYouTubeVideoId = (url) => {
    const videoIdMatch = url.match(/(?:\/|v=)([A-Za-z0-9_-]{11})(?=&|$)/);
    if (videoIdMatch) {
      return videoIdMatch[1];
    }
    return null;
  };

  const addVideo = async () => {
    if (newVideo.title && newVideo.url) {
      const videoId = getYouTubeVideoId(newVideo.url);

      if (videoId) {
        const videoToAdd = {
          ...newVideo,
          rating: 0,
          id: idCounter,
          timestamp: new Date().toISOString(),
        };

        try {
          const response = await fetch(
            "https://node-server-full-stack.onrender.com/videos",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(videoToAdd),
            }
          );

          if (response.ok) {
            const responseData = await response.json();
            setVideos([...videos, responseData]);
            setNewVideo({ title: "", url: "" });
            setIdCounter(idCounter + 1);
          } else {
            console.error("Failed to add video:", response.statusText);
          }
        } catch (error) {
          console.error("Error adding video:", error);
        }
      } else {
        alert("Invalid YouTube URL. Please enter a valid YouTube video URL.");
      }
    }
  };

  const upvoteVideo = (id) => {
    const updatedVideos = videos.map((video) =>
      video.id === id ? { ...video, rating: video.rating + 1 } : video
    );
    setVideos(updatedVideos);
  };

  const downvoteVideo = (id) => {
    const updatedVideos = videos.map((video) =>
      video.id === id && video.rating > 0
        ? { ...video, rating: video.rating - 1 }
        : video
    );
    setVideos(updatedVideos);
  };

  const removeVideo = (id) => {
    const updatedVideos = videos.filter((video) => video.id !== id);
    setVideos(updatedVideos);
  };

  return (
    <>
      <div>
        <h2>Add a Video</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newVideo.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="url"
          placeholder="URL"
          value={newVideo.url}
          onChange={handleInputChange}
        />
        <button onClick={addVideo}>Add Video</button>
      </div>
      <div>
        <h2>Videos</h2>
        <ul className="ShowingVideos">
          {videos.map((video) => (
            <div className="videos" key={video.id}>
              <li>
                <h3>{video.title}</h3>
                <div className="buttons">
                  <i
                    className="fa-solid fa-thumbs-up"
                    onClick={() => upvoteVideo(video.id)}
                  ></i>
                  <h4>{video.rating}</h4>
                  <i
                    className="fa-solid fa-thumbs-down"
                    onClick={() => downvoteVideo(video.id)}
                  ></i>
                </div>
                <iframe
                  className="allVideos"
                  title={video.title}
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                    video.url
                  )}`}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
                <p>Posted at: {new Date(video.timestamp).toLocaleString()}</p>
                <button onClick={() => removeVideo(video.id)}>Delete</button>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Addvideo;
