import React from 'react';
import { FaSearch } from "react-icons/fa";
import { useState } from 'react';


function AddAndSearch({ videos, setVideos }) {
  //SEARCH
  const [search, setSearch] = useState("");
  function handleSearch(e) {
    e.preventDefault();
    const searchInput = e.target.value.toLowerCase();
    setSearch(searchInput);
    const searchFiltered = videos.filter((video) => {
      return video.title.toLowerCase().includes(searchInput);
    });
    setVideos(searchFiltered);
  }

  //ADD BUTTON
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleAdd = (e) => {


    e.preventDefault();// <-- prevent form submit action
    //(Form Validation) if the user provides the title and url
    if (title && url) {
      // on success
      // take the form values and keep them inside the Newvideo object
      localStorage.setItem('title', title);
      localStorage.setItem('url', url);
      const newVideo = {};
      newVideo.id = Math.random();//or new Date().getTime().toString()
      newVideo.title = localStorage.getItem('title');
      newVideo.url = localStorage.getItem('url');
      setVideos(videos => [...videos, newVideo]); // <-- update arr state

      setTitle('');
      setUrl('');
    } else {
      // empty values
      console.log("Plz fill out the form !")

    }
    //CANCEL
    // onClick={() => setVideos(videos)}


  }

  return (
    <div className='container'>


      <form form className='form' >

        <div className='search-box'>

          <input className='search-input' name='search-input' type='text' placeholder='Search here' onChange={(e) => { handleSearch(e) }} />
          <FaSearch style={{ color: 'black', fontSize: '20px', marginBottom: '8px', backgroundColor: '#aac3dc', height: '26px', marginTop: '3px' }} />

        </div>

        <a href='#'>Add video</a>
        <div>
          <label for="title">Title</label>
          <input
            className='input-title'
            // aria-labelledby="title"
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)} />

        </div>
        <div>
          <label for="url">URL</label>
          <input
            className='input'
            // aria-labelledby="url"
            type='text'
            id='url'
            value={url}
            onChange={(e) => setUrl(e.target.value)} />

        </div>
        <div className='buttons'>
          <button className='cancel' type='cancel' aria-label="cancel added video" onClick={() => setVideos(videos)}>Cancel</button>
          <button className='add' type='submit' autoComplete="on" aria-label='add new video' onClick={handleAdd}>Add</button>
        </div>
      </form >
    </div >


  );
}

export default AddAndSearch;