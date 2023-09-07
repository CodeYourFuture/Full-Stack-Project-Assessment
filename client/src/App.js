import React, { useState, useEffect } from 'react';
import "./App.css";
import Video from './Video'; 
import AddVideo from './AddVideo';
import axios from 'axios'; 

function App() {
  const [videos, setVideos] = useState([]); 
  const [order, setOrder] = useState('desc'); // Initialize order state

  useEffect(() => {
    // Use Axios to make the GET request with the 'order' parameter
    axios.get(`http://localhost:4000/?order=${order}`)
      .then((response) => {
        setVideos(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching data from the server:", error);
      });
  }, [order]); // Update the videos when 'order' changes

  const handleAdd = (newVideo) => {
    setVideos([...videos, newVideo]);
  };

  const handleRemove = (videoId) => {
    const updatedVideos = videos.filter(video => video.id !== videoId);
    setVideos(updatedVideos);
  };

  // Function to toggle the order when the button is clicked
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
      {videos.map(video => (
        <Video key={video.id} video={video} onRemove={handleRemove} />
      ))}
    </div>
  );
}

export default App;
