import React, { useState, useEffect } from 'react';
import './App.css';
// import videosData from './exampleresponse.json';
import AddNewVideo from './AddNewVideo';
import axios from 'axios';

function App() {
  const [videos, setVideos] = useState([]);
  const [ascending, setAscending] = useState(false);
  // videosData.sort((a,b) => b.rating - a.rating)



const fetchVideos = async () => {
  try {
    const response = await axios.get('http://localhost:8000/videos');
    // console.log('videos', response)
    setVideos(response.data);
  } catch (error) {
    console.error('Error fetching videos:', error);
  }
};

useEffect(() => {
  fetchVideos();
}, [ascending]);

const handleChangeOrder = () => {
  setAscending(!ascending)
};


  const addVideoButton = (NewVideo) => {
    setVideos([...videos, NewVideo]);
  }

  const handleUpVote = (id) => {
    const updatedVideos = [...videos].map((video) => {
    if(video.id === id) {
        return {...video, rating: video.rating + 1 };
    } else {
      return video;
    }
  });
    

  setVideos(updatedVideos.sort((a, b) => b.rating - a.rating));

  

};

const handleDownVote = (id) => {
  const updatedVideos = [...videos].map((video) => {
    if (video.id === id) {
      return {...video, rating: video.rating -1 };
    } else {
      return video;
    }
  });

 setVideos(updatedVideos.sort((a, b) => b.rating - a.rating));


 
  };

  const handleRemoveVideo = (id) => {
    const updatedVideos = videos.filter((video) => video.id !== id);
    setVideos(updatedVideos);
  };

  // const handleChangeOrder = () => {
  //   if(ascending) {
  //     setAscending(false)
  //     fetchVideos();
  //   } else {
  //     setAscending(true);
  //     fetchVideos();
  //   }
  // }


  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>

      <AddNewVideo addVideoButton={addVideoButton} /> 
       <div className='video-list'> 
        
        {videos.map((video) => (
         <div key={video.id} className='video-card'>
         {/* {videos.map((video, index) => (
          <div key={`${video.id}-${ascending}-${index}`} className='video-card'> */}
        
          <h2>{video.title}</h2>
          <iframe
          width="560"
          height="315"
         src={`https://www.youtube.com/embed/${video.url.split('v=')[1]}`}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen></iframe>
          <p>Rating: {video.rating}</p>
          <p>Uploaded Date: {new Date(video.uploadDate).toLocaleString()}</p>
          
        <button onClick={() => handleUpVote(video.id)}>Up Vote</button>
        <button onClick={() => handleDownVote(video.id)}>Down Vote</button>
        <button onClick={() => handleRemoveVideo(video.id)}>Remove</button>
        <button onClick={handleChangeOrder}>
          {ascending ? 'Order Ascending' : 'Order Descending'}
            {/* if(orderAscending) {
              'orderAscending'
            } else {
              'orderDescending'
            } */}

        </button>
</div>
        ))}
      </div>
  
    </div>
  );
}

export default App;
