import React, { useState } from 'react';
import exampleresponse from './exampleresponse.json';
import Button from '@material-ui/core/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddVideoForm from './AddVideoForm';
import Title from './Title';
import EmbeddedVideo from './EmbeddedVideo';
import Votes from './Votes';
import LikeDislikeDelete from './LikeDislikeDelete';

const MiniYouTube = () => {
  const [searchInput, setSearchInput] = useState([]);
  const [videos, setVideos] = useState(exampleresponse);

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value.toLowerCase());
    const searchResult = videos.filter((video) =>
      video.title.toLowerCase().includes(searchInput)
    );
    setVideos(searchResult);
    if (e.target.value === '') setVideos(exampleresponse);
  };

  const addNewVideo = (title, url) => {
    const regExp =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    const match = url.match(regExp);
    if (title === '') {
      alert('Title should not be empty!');
    } else if (url === '') {
      alert('You have not entered a url!');
    } else if (!match) {
      alert('Invalid url!');
    } else
      setVideos([...videos, { id: '', title: title, url: url, rating: 0 }]);
  };

  const ascendingOrder = () => {
    const ascend = [...videos];
    ascend.sort(
      (a, b) => parseFloat(a.rating) - parseFloat(b.rating)
    );
    setVideos(ascend)
  }

  const descendingOrder = () => {
    const descend = [...videos];
    descend.sort(
      (a, b) => parseFloat(b.rating) - parseFloat(a.rating)
    );
    setVideos(descend);
  }

  const voteUpdater = (videoObj, newVote) => {
    let updatedVideo = { ...videoObj, rating: newVote };
    let newData = [...videos];
    const i = newData.findIndex((video) => video.id === videoObj.id);
    newData[i] = updatedVideo;
    setVideos(newData);
  }

  const videoRemover = (id) => {
    const remainingVideos = videos.filter(video => video.id !== id);
    setVideos(remainingVideos);
  }

  return (
    <div key='main-wrapper'>
      <div key='buttonAndSearch' className='add-button-and-search-wrapper'>
        <header className='App-header'>
          <div>
            <Button
              className='ascending'
              onClick={() => ascendingOrder()}
              variant='contained'
              color='default'
            >
              Ascending
            </Button>
          </div>
          <div>
            <h1>Video Recommendation</h1>
          </div>
          <div>
            <Button
              className='descending'
              onClick={() => descendingOrder()}
              variant='contained'
              color='default'
            >
              Descending
            </Button>
          </div>
        </header>
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
      <div className='main-container'>
        {videos.map((video) => {
          const video_id = video.url.split('v=')[1];
          return (
            <div className='video-and-details-wrapper'>
              <Title title={video.title} />
              <EmbeddedVideo id={video_id} />
              <Votes vote={video.rating} />
              <LikeDislikeDelete video={video} rating={video.rating} id={video.id} voteUpdater={voteUpdater} videoRemover={videoRemover} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MiniYouTube;
