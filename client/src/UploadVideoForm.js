import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddToQueueRoundedIcon from '@material-ui/icons/AddToQueueRounded';

const UploadVideoForm = ({ addNewVideo }) => {
  const [reveal, setReveal] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const addVideo = () => {
    setReveal(true);
  };
  const submitNewVideo = (e) => {
    e.preventDefault();
    addNewVideo(title, url);
    const requestBody = { title: title, url: url }
    fetch('https://fullstackvideos.herokuapp.com/api', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(data => console.log(data));
    setTitle('');
    setUrl('');
    setReveal(false);
  };

  return (
    <div className='upload-video-form-and-buttons'>
      <Button onClick={addVideo} className='add-button'
        variant='contained' color='primary'>
        Add Video &nbsp;
        <AddToQueueRoundedIcon />
      </Button>
      <form
        onSubmit={submitNewVideo}
        className={reveal ? 'reveal-form' : 'd-none'}
        action='submit'
      >
        <div className='form-group'>
          <label className='form-label text-light' htmlFor='Title'>
            Title
          </label>
          <input
            type='text'
            className='form-control'
            id='title'
            name='title'
            placeholder='Enter a title'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className='form-group'>
          <label className='form-label text-light' htmlFor='url'>
            URL
          </label>
          <input
            type='text'
            className='form-control'
            id='url'
            name='url'
            placeholder='Enter a url'
            onChange={(e) => setUrl(e.target.value)}
            value={url}
          />
          <small id='info' className='form-text text-muted'>
            Please make sure you enter a valid YouTube url.
          </small>
        </div>
        <Button type='submit' className='submit-btn'
          variant='contained' color='primary'>
          Upload
        </Button>
      </form>
    </div>
  );
};

export default UploadVideoForm;