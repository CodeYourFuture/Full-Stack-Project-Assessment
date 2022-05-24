import React from 'react'
import VideoList from './components/VideoList';
import './App.css'

function App() {
   
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <div className="root">
        <VideoList />
      </div>
    </div>
  )
  }

export default App
