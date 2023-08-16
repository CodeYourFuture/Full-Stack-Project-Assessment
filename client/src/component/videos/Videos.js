import React, { useEffect, useState } from "react";
import axios from "axios";
import "../videos/videos.css";
import DeleteComponent from "../delete/DeleteComponent";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const url = "http://127.0.0.1:5000/videos/data";

  const fetchVideoData = async () => {
    try {
      const res = await axios.get(url);
      const data = res.data;
      setVideos(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, []);

  const onDeleteHandler = () => {
    fetchVideoData();
  };

  // let videoIds = videos.map((vid) => vid.url.split("v=")[1])

  return (
    <div className="container m-20">
      <h1 className="video-div">Video Recommendation</h1>
      <div className="row g-4">
        {videos.map((video) => (
          <div className="col-12 col-md-6 col-lg-4" key={video.id}>
            <div className="card m-2">
              <div className="embed-responsive  ">
                <iframe
                  className="embed-responsive-item"
                  src={`https://www.youtube.com/embed/${
                    video.url.split("v=")[1]
                  }`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="card-body d-flex flex-column">
                <h6 className="card-title">{video.title}</h6>
                <span className="card-text">{video.rating}</span>
              </div>
              <div className="mt-auto">
                <DeleteComponent
                  id={video.id}
                  onDeleteHandler={onDeleteHandler}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;
