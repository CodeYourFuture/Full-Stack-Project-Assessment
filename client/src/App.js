import './App.css'
import VideoCard from './Componenets/VideoCard'
import AddVideo from './Componenets/AddVideo'
import { useState, useEffect } from 'react'

const App = () => {
  const [videos, setVideos] = useState([])
  const [update, setUpdate] = useState(0)

  useEffect(() => {
    fetch('https://michellejanay-cyf-video-app.onrender.com/videos')
      .then((res) => res.json())
      .then((data) => {
        setVideos(data)
      })
  }, [update])

  const removeVideo = (id) => {
    fetch(`https://michellejanay-cyf-video-app.onrender.com/videos/${id}`, {
      method: 'DELETE',
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
        <AddVideo
          update={update}
          setUpdate={setUpdate}
          videos={videos}
          setVideos={setVideos}
        />
        {videos && <VideoCard videos={videos} removeVideo={removeVideo} />}
      </main>
    </div>
  )
}

export default App
