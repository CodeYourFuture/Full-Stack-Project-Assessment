import React, { useState, useEffect } from 'react';
import VideoCardContainer from './components/VideoCardContainer';
import Header from './components/headerComponents/Header';

function App() {
  const [videosArr, setVideosArr] = useState([]);
  const [orderBy, setOrderBy] = useState('');
  const [videosArrUpdated, setVideosArrUpdated] = useState(1);
  console.log(orderBy);
  // const fetchVideosFromAPi = async () => {
  //   const response = await fetch("http://localhost:5000");
  //   console.log(response);
  //   const data = await response.json();
  //   console.log(data);
  //   setVideosArr(data);
  // }

  // const fetchVideosDataFromApi = () => {
  //   fetch(`http://localhost:5000/?order=${orderBy}`)
  //     .then(res => res.json())
  //     .then(data => setVideosArr(data))
  //     .catch(err => console.error(err))
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
  }, [orderBy, videosArrUpdated])

  return (
    <div>
      <Header setOrderBy={setOrderBy} orderBy={orderBy} 
      setVideosArrUpdated={setVideosArrUpdated} videosArrUpdated={videosArrUpdated} />
      <VideoCardContainer videosArr={videosArr} setVideosArr={setVideosArr} />
    </div>
  );
}

export default App;
