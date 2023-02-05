import './App.css'
import VideoCard from './Componenets/VideoCard'
import AddVideo from './Componenets/AddVideo'
import { useState, useEffect } from 'react'

const App = () => {
  const [videos, setVideos] = useState([])
  const [update, setUpdate] = useState(0)

  useEffect(() => {
    fetch('http://localhost:3001/videos')
      .then((res) => res.json())
      .then((data) => {
        setVideos(data)
      })
  }, [update])

  const removeVideo = (id) => {
    console.log(id)
    fetch(`http://localhost:3001/videos/${id}`, {
      method: 'delete',
    })
      .then((res) => res.json)
      .then(setUpdate(update + 1))
      .catch((err) => console.log(err))
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendations</h1>
      </header>
      <main>
        <AddVideo videos={videos} setVideos={setVideos} />
        {videos && <VideoCard videos={videos} removeVideo={removeVideo} />}
      </main>
    </div>
  )
}

export default App
