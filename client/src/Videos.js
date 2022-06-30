import React, { useEffect, useState } from "react";
import videoData from "./exampleresponse.json";
import Likes from "./Likes";
import axios from "axios";

const baseURL = "http://localhost:5000/";

const Videos = ({ searchInput }) => {
  const [videos, setVideos] = useState(videoData);

  //added use effect, now videos coming from the server
  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setVideos(response.data);
    });
  }, []);

  if (!videos) return null;

  //deletes post from the server
  const deleteVideo = (id) => (e) => {
    e.preventDefault();
    axios.delete(`${baseURL} + ${id}`).then(() => {
      const output = videos.filter((video) => video.id !== id);
      alert(`are sure you want to deleted this video?`);
      setVideos(output);
    });
  };

  // const deleteVideo = async (id) => {
  //   try {
  //     const deleteVideo = await fetch(
  //       `http://newfullstac.herokuapp.com/${id}`,
  //       {
  //         method: "DELETE",
  //         headers: new Headers({
  //           "Content-type": "application/json",
  //         }),
  //       }
  //     );
  //     console.log(deleteVideo);
  //     setVideos(videos.filter((todo) => todo.todo_id !== id));
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  return (
    <>
      <div className="container">
        {videos
          .filter((element) =>
            element.title.toLowerCase().includes(searchInput.toLowerCase())
          )
          .map((video, index) => {
            const after_ = video.url.substring(video.url.indexOf("=") + 1);

            return (
              <>
                <div className="card">
                  <h2 className="title">{video.title}</h2>

                  <div className="iframe">
                    <iframe
                      width="300"
                      height="200"
                      src={`https://www.youtube.com/embed/${after_}`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <span>Ratings: {video.rating}</span>
                  <Likes />
                  <div className="delete--button">
                    <button
                      className="btn btn-success btn-sm"
                      id={video.id}
                      onClick={deleteVideo(video.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default Videos;
