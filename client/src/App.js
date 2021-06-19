// eslint-disable-next-line
import "./App.css";
import React from 'react';
import AllVideoData from "./AllVedioData"
import videosData from './exampleresponse.json';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="ahmad">Video Recommendation</h1>
      </header>
      <main>
        <div className="container">
          <AllVideoData videoData = {videosData}/>
        </div>
      </main>
    </div>
  )
}

export default App;
