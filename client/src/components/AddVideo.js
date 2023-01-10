import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../context/VideoContext';
import { useRef } from 'react';


function AddVideo() {
  const { dispatch } = useGlobalContext();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [titleErr, setTitleErr] = useState({});
  const [urlErr, setUrlErr] = useState({});

  const urlValidation = (url) => {
    const regEx = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    return regEx.test(url)
  }

  const formValidation = () => {
    const titleErr = {};
    const urlErr = {};
    let isValid = true;
    urlValidation()

    if (!title) {
      titleErr.titleMissing = 'add a title'
      isValid = false;
    }

    if (!urlValidation(url)) {
      urlErr.urlWrong = 'url not valid'
      isValid = false;

    }

    setUrlErr(urlErr);
    setTitleErr(titleErr);
    return isValid;
  }

  const handleHideTitleErr = () => {
    setTitleErr('')
  }
  const handleHideUrlErr = () => {
    setUrlErr('')
  }

  //cancel button
  const titleRef = useRef(null);
  const urlRef = useRef(null);


  const handleCancel = () => {
    titleRef.current.value = '';
    urlRef.current.value = '';

  }

  //post one video
  const handleAdd = async (e) => {
    e.preventDefault();
    const isValid = formValidation();
    if (isValid) {
      const newVideo = {
        title,
        url,
        rating: 0,
        id: new Date().getTime().toString(),
      };
      try {
        dispatch({ type: 'SENDING_REQUEST' });
        const response = await axios.post(`/api/videos`, newVideo);
        console.log('new video added:', newVideo)
        dispatch({ type: 'ADD_VIDEO', payload: newVideo })
        const data = await response.data;
        console.log(data)
        dispatch({ type: 'REQUEST_FINISHED' });

      }
      catch (error) {
        console.log(error)
      }
    }
  };



  return (
    <>
      <div className='container'>
        <form className='form' >
          <p>ADD VIDEO:</p>
          <div>
            <label htmlFor="title">Title</label>
            <input
              className='input-title'
              ref={titleRef}
              type='text'
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)} />
            <div>{Object.keys(titleErr).map((key) => {
              return <div style={{ color: 'red', backgroundColor: 'white', borderRadius: '5px', width: '10rem', marginLeft: '31rem' }}>{titleErr[key]}<button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={handleHideTitleErr}>
                <span aria-hidden="true">&times;</span></button></div>
            })}</div>

          </div>
          <div>
            <label htmlFor="url">URL</label>
            <input
              className='input'
              ref={urlRef}
              type='text'
              id='url'
              value={url}
              onChange={(e) => setUrl(e.target.value)} />
            <div> {Object.keys(urlErr).map((key) => {
              return <div style={{ color: 'red', backgroundColor: 'white', borderRadius: '5px', width: '10rem', marginLeft: '31rem' }}>{urlErr[key]}<button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={handleHideUrlErr}>
                <span aria-hidden="true">&times;</span></button></div>
            })}</div>

          </div>
          <div className='buttons'>
            <button className='cancel' type='cancel' aria-label="cancel added video" onClick={handleCancel}>Cancel</button>
            <button className='add' type='submit' autoComplete="on" aria-label='add new video' onClick={handleAdd}>Add</button>
          </div>
        </form >
      </div >
    </>


  );
}

export default AddVideo;