import React, { useState, useEffect } from 'react';
import './App.css';
import Video from './Video';
import AddVideo from './AddVideo';
import axios from 'axios';

function App() {
  const [videos, setVideos] = useState([]);
  const [order, setOrder] = useState('desc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/?order=${order}`);
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching data from the server:', error);
      }
    };

    fetchData();
  }, [order]);

  const handleAdd = (newVideo) => {
    setVideos((prevVideos) => [...prevVideos, newVideo]);
  };

  const handleRemove = (videoId) => {
    setVideos((prevVideos) => prevVideos.filter((video) => video.id !== videoId));
  };

  const toggleOrder = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc');
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>BEKIR's Video Recommendations</h1>
      </header>
      <button className="btn" onClick={toggleOrder}>
        Toggle Order: {order === 'asc' ? 'Ascending' : 'Descending'}
      </button>
      <AddVideo onAdd={handleAdd} />

    
      <div className="row">
        {videos.map((video) => (
          <div className="col-lg-4 col-md-6 col-sm-12" key={video.id}>
            <Video video={video} onRemove={handleRemove} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;
