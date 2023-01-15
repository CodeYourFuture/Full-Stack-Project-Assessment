import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactPlayer from 'react-player'
import axios from "axios";
import { useGlobalContext } from '../context/VideoContext';

function ViewOneVideo() {
  const { getOneVideo, oneVideo } = useGlobalContext();
  const { id } = useParams();

  useEffect(() => {
    getOneVideo(id);
  }, [id]);



  return (
    <div className="view-video">
      <br />
      <article>
        {oneVideo.map((elem, key) => {
          const { title, url, id } = elem;
          return (
            <div key={elem.id}>
              <p style={{ color: '#093e43' }}>{elem.title}</p>
              <div style={{ height: '30rem' }}><ReactPlayer url={elem.url} style={{ marginLeft: '20rem', marginTop: '4rem' }} /></div>

            </div>
          )

        })}
      </article>
      <Link to='/' className='btn btn-secondary'>
        back home
      </Link>
    </div >
  );
}
export default ViewOneVideo;