import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form'

const AddVideoForm = ({video, onAddVideo }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const methods = useForm()
  // const [success, setSuccess] = useState(false)

    const handleCancel = () => {
    setTitle('');
    setUrl('');
  };

    const validateUrl = (url) => {
    // Simple validation for YouTube URLs
    return /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+$/.test(url);
  };

  const handleAddVideo = () => {
   
    if (title.trim() === '') {
      setErrorMessage('Please enter a title');
      return;
    }

    if (!validateUrl(url)) {
      setErrorMessage('Please enter a valid YouTube URL');
      return;
    }

    const newVideo = {
      id: Date.now(), // Generate a unique ID
      title: title,
      url: url,
      rating: video.rating,
    };
    onAddVideo(newVideo);
    setTitle('');
    setUrl('');
    setErrorMessage('');
  };

  return (
    <>
    <div className="add-video-form">
      <a href='0#' className='addVideo'>Add Video</a>

      <FormProvider {...methods}>
      <form onSubmit={handleAddVideo}>
          <div className='title'>
          <label>Title
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title'
                    validation={{
                      required: {
                        value: true,
                        message: 'required'
                      }}} />
          </label>
          {errorMessage && <p className='err-m' >{errorMessage}</p>}
          </div>

          <div className='url'>
          <label>URL
          <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder='Url'
                    validation={{
                      required: {
                        value: true,
                        message: 'required'
                      }}}            
 />
          </label>
          </div>  
        
        <div className='cancel-add-btn'>
        <button className='btn btn-warning input' type="submit" onClick={handleCancel}>Cancel</button>
        <button className='btn btn-danger input' type="submit" onClick={handleAddVideo}>ADD</button>
        
        </div>
      </form>
      </FormProvider>
      </div>

      <div className='search'>
      <form>
        <label>
          Search
          <input className='search-input' type="text" name="search" />
        </label>
      </form>
      </div>
    </>
  );
};

export default AddVideoForm;


