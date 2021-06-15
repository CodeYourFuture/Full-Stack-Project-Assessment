import "./App.css";
import React from 'react';
import videos from './data/exampleresponse.json';
import VideoCardContainer from './components/VideoCardContainer';

function App() {
  return (
    <div className="App">
      {/* {videos.map((vid, index) => (<div>{vid.title}</div>))} */}
      <VideoCardContainer videos={videos} />
    </div>
  );
}

export default App;
