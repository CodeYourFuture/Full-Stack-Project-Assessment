import React, { useState, useEffect } from 'react';
import './App.css';
import AddVideo from './AddVideo';
import ModifiedVideo from './ModifiedVideo'; 
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
    <div className="app-container">
      <header className="app-header">
        <h1>My Awesome Video Collection</h1>
      </header>
      <button className="toggle-button" onClick={toggleOrder}>
        Toggle Order: {order === 'asc' ? 'Ascending' : 'Descending'}
      </button>
      <AddVideo onAdd={handleAdd} />
      <div className="video-list">
        {videos.map((video) => (
          <ModifiedVideo video={video} onRemove={handleRemove} key={video.id} /> // Updated component name
        ))}
      </div>
    </div>
  );
}

export default App;