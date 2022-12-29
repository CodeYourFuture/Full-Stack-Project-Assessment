import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function ViewVideo(setVideos) {
  const [oneVideo, setOneVideo] = useState({});
  const { id } = useParams();

  const getOneVideo = async () => {
    try {
      const response = await axios.get(`/api/videos/${id}`)
      console.log(response.data);
      setOneVideo(response.data);
    } catch (error) {
      console.error('Failure!');
      console.error(error.response.status);
    }

  }

  useEffect(() => {
    getOneVideo();
  }, [id]);

  return (
    <div className="view-video">
      <h1>Single Post</h1>
      <br />
      <article>

        <p>{id}</p>

      </article>
      <Link to='/' className='btn btn-primary'>
        back home
      </Link>
    </div>
  );
}
export default ViewVideo;