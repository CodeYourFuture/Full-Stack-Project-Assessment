import React, { useState } from 'react';
import exampleresponse from './exampleresponse.json';
import ReactPlayer from 'react-player';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import AddVideoForm from './AddVideoForm';
library.add(faThumbsUp);
library.add(faThumbsDown);

const MiniYouTube = () => {
  const [searchInput, setSearchInput] = useState([]);
  const [videos, setVideos] = useState(exampleresponse);
  console.log(videos);
  const handleSearchInput = (e) => {
    console.log(e.target.value);
    setSearchInput(e.target.value.toLowerCase());
  };
  const videoRemover = (e) => {
    const toBeRemoved = e.target.parentElement.id;
    const filteredData = videos.filter(
      (video) => video.id.toString() !== toBeRemoved
    );
    return setVideos(filteredData);
  };
  const addNewVideo = (title, url) => {
    setVideos([...videos, { id: '', title: title, url: url, rating: '' }]);
  };

  return (
    <div>
      <div className='add-button-and-search-wrapper'>
        <AddVideoForm addNewVideo={addNewVideo} />
        <div key='input-form' className='search-input-wrapper'>
          <i class='fas fa-search'></i>
          <input
            key='search-input'
            type='text'
            className='search-bar'
            placeholder='Search for a video ...'
            value={searchInput}
            onChange={handleSearchInput}
          />
        </div>
      </div>

      <div className='display-wrapper'>
        {videos.map((video) => {
          return (
            <div className='video-and-title'>
              <h4>{video.title}</h4>
              <ReactPlayer
                width='560'
                height='315'
                className='embedded-video'
                url={video.url.toString()}
              />
              <h4 className='rating'>Rating:{video.rating}</h4>
              <div id={video.id} className='buttons-container'>
                <FontAwesomeIcon
                  className='link-danger dislike'
                  icon={'thumbs-down'}
                />
                <Button onClick={videoRemover} variant='danger'>
                  Delete
                </Button>
                <FontAwesomeIcon
                  className='link-danger like'
                  icon={'thumbs-up'}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MiniYouTube;
