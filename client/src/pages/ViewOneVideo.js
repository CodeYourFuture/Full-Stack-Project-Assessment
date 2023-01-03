import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactPlayer from 'react-player'
import axios from "axios";

function ViewOneVideo() {
  const [oneVideo, setOneVideo] = useState([]);
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
        {oneVideo.map((elem) => {
          const { title, url } = elem;
          return (
            <>
              <p>{elem.title}</p>
              <div style={{ height: '25rem' }}><ReactPlayer url={elem.url} style={{ marginLeft: '20rem', marginTop: '2rem' }} /></div>

            </>
          )

        })}
      </article>
      <Link to='/' className='btn btn-primary'>
        back home
      </Link>
    </div>
  );
}
export default ViewOneVideo;