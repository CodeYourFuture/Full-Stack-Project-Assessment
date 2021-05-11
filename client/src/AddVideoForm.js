import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddVideoForm = ({ addNewVideo }) => {
  const [reveal, setReveal] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const addVideo = () => {
    setReveal(true);
  };

  const submitNewVideo = (e) => {
    e.preventDefault();
    addNewVideo(title, url);
    setTitle('');
    setUrl('');
  };

  return (
    <div>
      <Button onClick={addVideo} className='add-button' variant='dark'>
        Add Video
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
        <Button type='submit' className='submit-btn' variant='dark'>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddVideoForm;
