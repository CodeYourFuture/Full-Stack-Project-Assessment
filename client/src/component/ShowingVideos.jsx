import React, { useState, useEffect } from "react";

function ShowingVideos() {
  const [videos, setVideos] = useState([]);
  const [orderBy, setOrderBy] = useState("desc");

  useEffect(() => {
    fetch("https://node-js-full-stack-project-assessment.onrender.com/videos")
      .then((response) => response.json())
      .then((data) => {
        // setVideos([])
        setVideos(data);
        console.log("lin 12,", data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [videos]);

  const toggleOrder = () => {
    setOrderBy(orderBy === "asc" ? "desc" : "asc");
  };

  const convertToEmbedUrl = (url) => {
    const videoId = url.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const deleteVideo = (id) => {
    fetch(
      `https://node-js-full-stack-project-assessment.onrender.com/videos/${id}`,
      {
        method: "DELETE",
      }
    )
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
    fetch(
      `https://node-js-full-stack-project-assessment.onrender.com/rate/${id}/${type}`,
      {
        method: "PUT",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((updatedRating) => {
        setVideos((prevVideos) =>
          prevVideos.map((video) => {
            if (video.id === id) {
              return { ...video, rating: updatedRating.rating };
            }
            console.log("lin 65", video);
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
  /////////////////////////////////
  console.log("line 79", videos);
  console.log("lin 80", sortedVideos);
  ///////////////////////////////////

  return (
    <div className="ShowingVideos">
      <button onClick={toggleOrder} className="Ordes">
        {orderBy === "asc" ? "Order Ascending" : "Order Descending"}
      </button>

      {sortedVideos.map((video) => (
        <div className="videos" key={video.id}>
          {/* ///////////////////// */}
          <p>{console.log("line 93", video)}</p>
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