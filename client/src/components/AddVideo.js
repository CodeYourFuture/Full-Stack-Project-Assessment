import React from 'react'
import { useState } from 'react';

const AddVideo = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

      if(!title) {
        alert('Add video title')
        return
      }  else if (!url) {
        alert('Add video url')
      } else if ((url.split("=").pop().length !== 11)) {
        alert('Add valid tube url')
      }
      onAdd({ title, url })

      setTitle('');
      setUrl('');
    }

  return (
    <form className='mb-3 form' onSubmit={onSubmit}>
        <div className='formDiv'>
            <label for='title' className="formLabel">Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}id='title' placeholder='Add title' className="formInput"/>
        </div>
        <div className='formDiv mt-3'>
            <label for='url' className="formLabel">Video url</label>
            <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} id='url' placeholder='Add video url' className="formInput"/>
        </div>
    <input type="submit" value='Submit' className="btn btn-primary mt-3"/>
    </form>
  )
}

export default AddVideo;