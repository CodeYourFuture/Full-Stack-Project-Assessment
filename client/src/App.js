import './App.css'
import VideoCard from './Componenets/VideoCard'
import AddVideo from './Componenets/AddVideo'
import { useState, useEffect } from 'react'

const App = () => {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    fetch('https://michellejanay-cyf-video-app.onrender.com/videos')
      .then((res) => res.json())
      .then((data) => {
        setVideos(data)
        // setFiltered(data.sort((a, b) => b.rating - a.rating));
      })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendations</h1>
      </header>
      <main>
        <AddVideo videos={videos} setVideos={setVideos} />
        {videos && <VideoCard videos={videos} setVideos={setVideos} />}
      </main>
    </div>
  )
}

export default App
