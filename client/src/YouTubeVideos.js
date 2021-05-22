import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import UploadVideoForm from './UploadVideoForm';
import Title from './Title';
import EmbeddedVideos from './EmbeddedVideos';
import Votes from './Votes';
import LikeDislikeDelete from './LikeDislikeDelete';

const YouTubeVideos = () => {
  const [videos, setVideos] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [backupVideos, setBackupVideos] = useState([]);

  useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then((data) => {
        setVideos(data);
        setBackupVideos(data);
      })
      .catch(err => console.error(err));
  }, []);

  const ascendingOrder = () => {
    fetch('/api/?order=asc')
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
      })
      .catch((err) => console.log(err));
  };

  const descendingOrder = () => {
    fetch('/api/?order=desc')
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
      })
      .catch((err) => console.log(err));
  };

  const addNewVideo = (title, url) => {
    const regExp =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    const match = url.match(regExp);
    if (title === '') {
      alert('Title should not be empty!');
    } else if (url === '' || !match) {
      alert('Invalid url!');
    } else
      return setVideos([
        {
          id: Date.now(),
          title: title,
          url: url,
          rating: 0,
          posted: new Date().toString(),
        },
        ...videos,
      ]);
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value.toLowerCase());
    const searchResult = videos.filter((video) =>
      video.title.toLowerCase().includes(searchInput)
    );
    setVideos(searchResult);
    if (e.target.value === '') setVideos(backupVideos);
  };

  const voteUpdater = (videoObj, newVote) => {
    let updatedVideo = { ...videoObj, rating: newVote };
    let newData = [...videos];
    const i = newData.findIndex((video) => video.id === videoObj.id);
    newData[i] = updatedVideo;
    setVideos(newData);

    const requestBody = { id: videoObj.id, rating: newVote };
    fetch('/api', { method: 'PATCH', headers: { 'Content-Type': 'application/json', 'Field-Name': 'Accept-Patch' }, body: JSON.stringify(requestBody) })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      })
      .catch((err) => console.log(err));
  };

  const videoRemover = (id) => {
    const remainingVideos = videos.filter(
      (video) => video.id !== id
    );
    setVideos(remainingVideos);
    fetch(`/api/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      })
      .catch((err) => console.log(err));
  }

  return (
    <div key='mainWrapper'>
      <div key='buttonAndSearch' className='add-button-and-search-wrapper'>
        <header className='App-header'>
          <div>
            <Button className='ascending' onClick={ascendingOrder} variant='contained' color='default'>
              Ascending
            </Button>
          </div>
          <div>
            <h1>Video Recommendation</h1>
          </div>
          <div>
            <Button className='descending' onClick={descendingOrder} variant='contained' color='default'>
              Descending
            </Button>
          </div>
        </header>
        <UploadVideoForm addNewVideo={addNewVideo} />
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
      <div key='displayWrapper' className='main-container'>
        {videos.map((video, index) => {
          const video_id = video.url.split('v=')[1];
          return (
            <div key={index} className='video-and-details-wrapper'>
              <Title title={video.title} />
              <EmbeddedVideos id={video_id} />
              <Votes vote={video.rating} />
              {/* <h6 className={video.posted ? 'posted' : 'd-none'}>
                Posted: {video.posted}
              </h6> */}
              <LikeDislikeDelete video={video} rating={video.rating} id={video.id} voteUpdater={voteUpdater} videoRemover={videoRemover} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default YouTubeVideos;