import React from 'react';
import './App.css';
import VideoList from './VideoLists';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Videos</h1>
        <VideoList />
      </header>
    </div>
  );
}

export default App;
