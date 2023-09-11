import React, { useEffect, useState } from "react";
import axios from "axios";
import "../videos/videos.css";
import DeleteComponent from "../delete/DeleteComponent";
import LikeComponent from "../likeAndDisLike/LikeComponent";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const url =
    "https://beko-video-project-fs-assessment-backend.onrender.com/videos/data";

  
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

  return (
    <div className="container m-20 container-div">
      <h1 className="video-div">Video Recommendation</h1>

      <div className="row g-4">
        {videos.map((video) => (
          <div className="col-12 col-md-6 col-lg-4" key={video.id}>
            <div className="card m-2 border-secondary">
              <div className="embed-responsive embed-responsive-16by9">
                <iframe
                  className="embed-responsive-item"
                  src={`https://www.youtube.com/embed/${
                    video.url.split("=")[1] || video.url.split("embed/")[1]
                  }`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{video.title}</h5>
                <div className="flex column">{<LikeComponent />}</div>
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
