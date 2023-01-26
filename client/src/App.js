import './App.css'
import VideoCard from './Componenets/VideoCard'
import AddVideo from './Componenets/AddVideo'
import exampleResponse from './exampleresponse.json'
import {useState} from 'react'

function App() {
const [videos, setVideos] = useState(exampleResponse)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendations</h1>
      </header>
      <main>
      <AddVideo exampleResponse={videos} setVideos={setVideos}/>
      <VideoCard videos={videos} setVideos={setVideos}/>
      </main>
    </div>
  )
}

export default App
