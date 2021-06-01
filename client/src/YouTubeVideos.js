import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@material-ui/core/Button';
import Header from './Header';
import UploadVideoForm from './UploadVideoForm';
import SearchBar from './SearchBar'
import Title from './Title';
import EmbeddedVideos from './EmbeddedVideos';
import Votes from './Votes';
import DeleteButton from './DeleteButton';
import Footer from './Footer';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const YouTubeVideos = () => {
  const [videos, setVideos] = useState([]);
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
    let newArray = videos;
    newArray = [
      {
        id: Date.now(),
        title: title,
        url: url,
        rating: 0,
        posted: new Date().toString(),
      },
      ...newArray
    ];
    return setVideos(newArray);
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
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  const stateUpdater = (updatedState) => {
    let newState = updatedState;
    return setVideos(newState);
  };

  return (
    <div key='mainWrapper'>
      <Header />
      <UploadVideoForm addNewVideo={addNewVideo} />
      <SearchBar
        stateUpdater={stateUpdater}
        videos={backupVideos} />
      <div className='order'>
        <div>
          <Button className='ascending'
            onClick={ascendingOrder}
            variant='contained'
            color='primary'>
            Asc Order &nbsp;
            <ArrowUpwardIcon />
          </Button>
        </div>
        <Button className='descending'
          onClick={descendingOrder}
          variant='contained'
          color='primary'>
          Desc Order &nbsp;
          <ArrowDownwardIcon />
        </Button>
      </div>
      <div key='displayWrapper' className='main-container'>
        {videos.map((video, index) => {
          const video_id = video.url.split('v=')[1];
          return (
            <div key={index} className='video-and-details-wrapper'>
              <Title title={video.title} />
              <EmbeddedVideos id={video_id} />
              <Votes vote={video.rating} video={video}
                videos={videos} rating={video.rating} stateUpdater={stateUpdater} />
              <DeleteButton
                id={video.id} videoRemover={videoRemover}
              />
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default YouTubeVideos;