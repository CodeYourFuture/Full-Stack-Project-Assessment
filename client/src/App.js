import React, { useState, useEffect } from 'react';
import VideoCardContainer from './components/VideoCardContainer';
import Header from './components/headerComponents/Header';

function App() {
  const [videosArr, setVideosArr] = useState([]);
  const [orderBy, setOrderBy] = useState('');
  console.log(orderBy);
  // const fetchVideosFromAPi = async () => {
  //   const response = await fetch("http://localhost:5000");
  //   console.log(response);
  //   const data = await response.json();
  //   console.log(data);
  //   setVideosArr(data);
  // }
  useEffect(() => {
    fetch(`http://localhost:5000/?order=${orderBy}`)
      .then(res => res.json())
      .then(data => setVideosArr(data))
      .catch(err => console.error(err))
    // try {
    //   fetchVideosFromAPi();
    // } catch (err) {
    //   console.error(err)
    // }
  }, [orderBy])

  return (
    <div>
      <Header setVideosArr={setVideosArr} videosArr={videosArr} setOrderBy={setOrderBy} orderBy={orderBy} />
      <VideoCardContainer videosArr={videosArr} setVideosArr={setVideosArr} />
    </div>
  );
}

export default App;
