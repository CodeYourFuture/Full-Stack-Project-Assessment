// import React, { useState, useEffect } from "react";

// function ShowingVideos() {
//   const [videos, setVideos] = useState([]);
//   const [orderBy, setOrderBy] = useState("desc");

//   useEffect(() => {
//     fetch(`http://127.0.0.1:5000/?order=${orderBy}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setVideos(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, [orderBy]);

//   const toggleOrder = () => {
//     setOrderBy(orderBy === "asc" ? "desc" : "asc");
//   };

//   const convertToEmbedUrl = (url) => {
//     const videoId = url.split("v=")[1];
//     return `https://www.youtube.com/embed/${videoId}`;
//   };

//   const deleteVideo = (id) => {
//     fetch(`http://127.0.0.1:5000/${id}`, {
//       method: "DELETE",
//     })
//       .then((response) => {
//         response.json();
//         setVideos((prevVideos) =>
//           prevVideos.filter((video) => video.id !== id)
//         );
//       })
//       .catch((error) => {
//         console.error("Error deleting video:", error);
//       });
//   };

//   const handleRating = (id, type) => {
//     fetch(`http://127.0.0.1:5000/rate/${id}/${type}`, {
//       method: "PUT",
//     })
//       .then((response) => {
//         return response.json();
//       })
//       .then((updatedVideo) => {
//         setVideos((prevVideos) =>
//           prevVideos.map((video) => {
//             if (video.id === id) {
//               return { ...video, rating: updatedVideo.rating };
//             }
//             return video;
//           })
//         );
//       })
//       .catch((error) => {
//         console.error("Error updating rating:", error);
//       });
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
//               onClick={() => handleRating(video.id)}
//             ></i>
//             <h4>{video.rating}</h4>
//             <i
//               className="fa-solid fa-thumbs-down"
//               onClick={() => handleRating(video.id)}
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

function ShowingVideos() {
  const [videos, setVideos] = useState([]);
  const [orderBy, setOrderBy] = useState("desc");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/videos")
      .then((response) => response.json())
      .then((data) => {
        setVideos(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const toggleOrder = () => {
    setOrderBy(orderBy === "asc" ? "desc" : "asc");
  };

  const convertToEmbedUrl = (url) => {
    const videoId = url.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const deleteVideo = (id) => {
    fetch(`http://127.0.0.1:5000/videos/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.json();
      })
      .then(() => {
        setVideos((prevVideos) =>
          prevVideos.filter((video) => video.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting video:", error);
      });
  };

  const handleRating = (id, type) => {
    fetch(`http://127.0.0.1:5000/rate/${id}/${type}`, {
      method: "PUT",
    })
      .then((response) => {
        return response.json();
      })
      .then((updatedRating) => {
        // Update the state with the new rating
        setVideos((prevVideos) =>
          prevVideos.map((video) => {
            if (video.id === id) {
              return { ...video, rating: updatedRating.rating };
            }
            return video;
          })
        );
      })
      .catch((error) => {
        console.error("Error updating rating:", error);
      });
  };

  const sortedVideos = [...videos].sort((a, b) => {
    if (orderBy === "asc") {
      return a.rating - b.rating;
    } else {
      return b.rating - a.rating;
    }
  });

  return (
    <div className="ShowingVideos">
      <button onClick={toggleOrder} className="Ordes">
        {orderBy === "asc" ? "Order Ascending" : "Order Descending"}
      </button>

      {sortedVideos.map((video) => (
        <div className="videos" key={video.id}>
          <p>{video.title}</p>
          <div className="buttons">
            <i
              className="fa-solid fa-thumbs-up"
              onClick={() => handleRating(video.id, "up")}
            ></i>
            <h4>{video.rating}</h4>
            <i
              className="fa-solid fa-thumbs-down"
              onClick={() => handleRating(video.id, "down")}
            ></i>
          </div>

          <iframe
            className="allVideos"
            width="300"
            height="220"
            src={convertToEmbedUrl(video.url)}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <button onClick={() => deleteVideo(video.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ShowingVideos;
