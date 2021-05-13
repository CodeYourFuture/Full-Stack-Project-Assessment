import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddVideoForm = ({ addNewVideo }) => {
  const [reveal, setReveal] = useState(false);
  const [controller, setController] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const addVideo = () => {
    setReveal(true);
  };
   const submitNewVideo = (e) => {
     e.preventDefault();
     setController(true);
     addNewVideo(title, url)
      setTitle('');
      setUrl('');
     

     // fetch('http://127.0.0.1:5000', { method: 'POST', body: JSON.stringify({title: title.toString(), url: url.toString()}) })
     //   .then((res) => res.json())
     //   .then((data) => {
     //     console.log(data);
     //     //setVideos(data);
     //   })
     // .catch((err) => console.log(err));
     //addNewVideo(title, url);
     //setTitle('');
     //setUrl('');
   };

  useEffect(() => {
    if (controller) {
      fetch(`http://127.0.0.1:5000`, {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        body: {
          'title': title,
          'url': url
        }
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      
       
         
        
      }).catch((err) => console.log(err));
      
     
    } 
     
    

     }, [controller, title, url]);

 

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
