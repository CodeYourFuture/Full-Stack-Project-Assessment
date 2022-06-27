import React from 'react'
import VideoList from '../details/VideoList'
import '../../App.css'
import Header from './Header';
import Footer from './Footer';
import MoveTop from './MoveTop';

function App() {
  return (
    <>
      <div className="App">
        {window.scrollY<1&&<MoveTop />}
        {console.log(window.scrollY)}
        <Header />
        <VideoList />
      </div>
      <Footer />
    </>
  )
}

export default App
