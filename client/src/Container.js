import React, { useState , useEffect } from "react";
import VideoSection from "./VideoSection";
import VideoContainer from "./VideoContainer";

const Container = () => {
  let videoData = [];
  console.log("just before useState", videoData);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((response) => response.json())
      .then((data) => {
        videoData = [...data];
        setVideos(videoData);
      })
      .catch((error) => console.log(error));
  }, []);

  // const handleRemove = (id) => {
  //   setVideos((updatedVideo) => updatedVideo.filter((v) => v.id !== id));
  // };

const handleRemove = (id) => {
fetch(`http://localhost:5000/${id}`, { method: "DELETE" })
  .then(() => {
    fetch("http://localhost:5000/")
      .then((response) => response.json())
      .then((data) => {
        videoData = [...data];
        setVideos(videoData);
      });
  })
  .catch((error) => console.log(error));
};


  // let idCounter = 1;
  // const handleAddVideo = (video) => {
  //   setVideos((updatedVideos) => {
  //     const newVideo = { ...video, id: idCounter++, rating: 0 };
  //     return [...updatedVideos, newVideo];
  //   });
  // };

  const handleAddVideo = (video) => {
    fetch(`http://localhost:5000/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(video),
    })
      .then(() => {
        fetch("http://localhost:5000/")
          .then((response) => response.json())
          .then((data) => {
            videoData = [...data];
            setVideos(videoData);
          });
      })
      .catch((error) => console.log(error));
      };

  // const handleUpVote = (id) => {
  //   setVideos((updatedVideo) =>
  //     updatedVideo.map((video) => {
  //       if (video.id === id) {
  //         return {
  //           ...video,
  //           rating: video.rating + 1,
  //         };
  //       }
  //       return video;
  //     })
  //   );
  // };

  const handleUpVote = (video) => {
    video.rating = video.rating+1;
    console.log(`my video data`,video);
    fetch(`http://localhost:5000/${video.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({video})
    })
      .then(() => {
        fetch(`http://localhost:5000/`)
          .then((response) => response.json())
          .then((data) => {
            videoData = [...data];
            setVideos(videoData);
          });
      })
      .catch((error) => console.log(error));
  }

  

  // const handleDownVote = (id) => {
  //   setVideos((updatedVideo) =>
  //     updatedVideo.map((video) => {
  //       if (video.id === id) {
  //         return {
  //           ...video,
  //           rating: video.rating - 1,
  //         };
  //       }
  //       return video;
  //     })
  //   );
  // };

    const handleDownVote = (video) => {
    video.rating = video.rating-1;
    console.log(`my video data`, video);
    fetch(`http://localhost:5000/${video.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ video }),
    })
      .then(() => {
        fetch(`http://localhost:5000/`)
          .then((response) => response.json())
          .then((data) => {
            videoData = [...data];
            setVideos(videoData);
          });
      })
      .catch((error) => console.log(error));
    };

  return (
    <div>
      <VideoContainer handleAddVideo={handleAddVideo} />
      <VideoSection
        videos={videos}
        upVote={handleUpVote}
        downVote={handleDownVote}
        removeVideo={handleRemove}
      />
    </div>
  );
};

export default Container;
