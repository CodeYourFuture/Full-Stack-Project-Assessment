import React from 'react'
import VideoList from '../details/VideoList'
import '../../App.css'
import Header from './Header';
import Footer from './Footer';

function App() {
  return (
    <>
      <div className="App">
        <Header />
        <VideoList />
      </div>
      <Footer />
    </>
  )
}

export default App
