import React, { useState, useEffect } from 'react';
import './App.css';
import AddVideo from './components/addvideo/AddVideo';
import axios from 'axios';
import VideoTable from './components/videotable/VideoTable';

function App() {
  const [videos, setVideos] = useState([]);
  const [order, setOrder] = useState('desc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/');
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching data from the server:', error);
      }
    };

    fetchData();
  }, []);

  const handleAdd = (newVideo) => {
    setVideos((prevVideos) => [...prevVideos, newVideo]);
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
      <AddVideo onAdd={handleAdd} setVideos={setVideos} />
      <div className="video-list">
        <VideoTable videos={videos} />
      </div>
    </div>
  );
}

export default App;
