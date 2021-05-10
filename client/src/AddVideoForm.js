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
    alert("You've successfully added a video!");
  };

  return (
    <div>
      <Button onClick={addVideo} className='add-button' variant='primary'>
        Add Video
      </Button>
      <form
        onSubmit={submitNewVideo}
        className={reveal ? 'reveal-form' : 'd-none'}
        action='submit'
      >
        <input
          type='text'
          id='title'
          name='title'
          placeholder='Enter title'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <input
          type='text'
          id='url'
          name='url'
          placeholder='Enter url'
          onChange={(e) => setUrl(e.target.value)}
          value={url}
        />
        <input className='primary' type='submit' value='Add a video' />
      </form>
    </div>
  );
};

export default AddVideoForm;
