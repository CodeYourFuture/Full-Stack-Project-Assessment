import './App.css'
import VideoCard from './Componenets/VideoCard'
import AddVideo from './Componenets/AddVideo'
// import exampleResponse from './exampleresponse.json'
import { useState, useEffect } from 'react'

const App = () => {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/videos')
        .then(res => res.json())
        .then(data => {
            setVideos(data.sort((a, b) => b.rating - a.rating));
            // setFiltered(data.sort((a, b) => b.rating - a.rating));
        })
}, []);

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
