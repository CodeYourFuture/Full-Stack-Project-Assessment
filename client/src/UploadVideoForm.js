import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddToQueueRoundedIcon from '@material-ui/icons/AddToQueueRounded';
import Alert from '@material-ui/lab/Alert';

const UploadVideoForm = ({ addNewVideo }) => {
  const [reveal, setReveal] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [titleErrorAlert, setTitleErrorAlert] = useState(false);
  const [urlErrorAlert, setUrlErrorAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);

  const addVideo = () => {
    setReveal(true);
  };
  const submitNewVideo = (e) => {
    e.preventDefault();
    const regExp =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    const match = url.match(regExp);
    if (title === '' && reveal) {
      setTitleErrorAlert(true)
    } else if ((url === '' || !match) && reveal) {
      setUrlErrorAlert(true)
    } else if (title !== '' && match && reveal) {
      addNewVideo(title, url);
      setSuccessAlert(true);
      const alertTimer = () => {
        setSuccessAlert(false)
      }
      setTimeout(alertTimer, 3000);
    }
    const requestBody = { title: title, url: url }
    fetch('/api', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(data => console.log(data));
    if (title !== '' && url !== '') {
      setTitle('');
      setUrl('');
      setReveal(false)
    }
  };

  return (
    <div className='upload-video-form-and-buttons'>
      <Button onClick={addVideo} className='add-button'
        variant='contained' color='primary'>
        Add Video &nbsp;
        <AddToQueueRoundedIcon />
      </Button>
      <div className='alert-messages'>
        <Alert className={titleErrorAlert ? 'alert' : 'd-none'} severity='error' onClose={() => setTitleErrorAlert(false)}>Failure! — Title field should not be empty!</Alert>
        <Alert className={urlErrorAlert ? 'alert' : 'd-none'} severity='error' onClose={() => setUrlErrorAlert(false)}>Failure! — You have not entered a valid URL!</Alert>
        <Alert className={successAlert ? 'alert' : 'd-none'} onClose={() => setSuccessAlert(false)}>Success! — Your videos is successfully uploaded!</Alert>
      </div>
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
        <div className='upload-and-cancel-buttons'>
          <Button type='cancel' className='cancel-button'
            variant='contained' color='secondary' onClick={() => setReveal(false)}>Cancel</Button>
          <Button type='submit' className='submit-btn'
            variant='contained' color='primary'>
            Upload
        </Button>
        </div>
      </form>
    </div>
  );
};

export default UploadVideoForm;