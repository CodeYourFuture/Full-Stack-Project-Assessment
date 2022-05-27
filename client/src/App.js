import React from 'react'
import VideoList from './components/VideoList';
import './App.css'
import AddVideo from './components/AddVideo';

function App() {
   
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
        <AddVideo />
      <div className="root">
        <VideoList />
      </div>
    </div>
  )
  }

export default App
