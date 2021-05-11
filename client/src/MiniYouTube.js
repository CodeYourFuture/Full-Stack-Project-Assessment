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
  const [searchInput, setSearchInput] = useState('');
  const [videos, setVideos] = useState(exampleresponse);

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value.toLowerCase());
    const searchResult = videos.filter((video) =>
      video.title.toLowerCase().includes(searchInput)
    );
    setVideos(searchResult);
    if (e.target.value === '') setVideos(exampleresponse);
  };

  const videoRemover = (e) => {
    const toBeRemoved = e.target.parentElement.id;
    const remainingVideos = videos.filter(
      (video) => video.id.toString() !== toBeRemoved
    );
    return setVideos(remainingVideos);
  };

  const addNewVideo = (title, url) => {
    const regExp = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    const match = url.match(regExp);
    if (title === '') {
      alert('Title should not be empty!');
    } else if (url === '' || !match) {
      alert('Invalid url!');
    } else
      setVideos([
        {
          id: Date.now(),
          title: title,
          url: url,
          rating: '',
          posted: new Date().toString(),
        },
        ...videos,
      ]);
  };

  const incrementRating = (e) => {
    const id = e.target.parentElement.parentElement.id;
    const likedVideo = videos.find((video) => video.id.toString() === id);
    likedVideo.rating = likedVideo.rating + 1;
    const i = videos.findIndex((video) => video.id === likedVideo.id);
    let newArray = [...videos];
    newArray[i] = likedVideo;
    setVideos(newArray);
  };

  const decrementRating = (e) => {
    const id = e.target.parentElement.parentElement.id;
    const dislikedVideo = videos.find((video) => video.id.toString() === id);
    dislikedVideo.rating = dislikedVideo.rating - 1;
    const i = videos.findIndex((video) => video.id === dislikedVideo.id);
    let newArray = [...videos];
    newArray[i] = dislikedVideo;
    setVideos(newArray);
  };

  videos.sort((a, b) => {
    if (a.rating > b.rating) return -1;
    else return 1;
  });

  return (
    <div key='mainWrapper'>
      <div key='buttonAndSearch' className='add-button-and-search-wrapper'>
        <AddVideoForm addNewVideo={addNewVideo} />
        <div key='input-form' className='search-input-wrapper'>
          <i key='fasIcon' className='fas fa-search'></i>
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
      <div key='displayWrapper' className='display-wrapper'>
        {videos.map((video, index) => {
          return (
            <div key={index} className='video-and-title'>
              <h4>{video.title}</h4>
              <ReactPlayer
                width='560'
                height='315'
                className='embedded-video'
                url={video.url}
              />
              <h5 className='rating'>Rating: {video.rating}</h5>
              <h6 className={video.posted ? 'posted' : 'd-none'}>Posted: {video.posted}</h6>
              <div id={video.id} className='buttons-container'>
                <FontAwesomeIcon
                  onClick={decrementRating}
                  className='dislike'
                  icon={'thumbs-down'}
                />
                <Button onClick={videoRemover} variant='danger'>
                  Delete
                </Button>
                <FontAwesomeIcon
                  onClick={incrementRating}
                  className=' like'
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
