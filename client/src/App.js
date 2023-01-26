import './App.css'
import VideoCard from './Componenets/VideoCard'
import AddVideo from './Componenets/AddVideo'
import exampleResponse from './exampleresponse.json'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AddVideo exampleResponse={exampleResponse}/>
      <VideoCard exampleResponse={exampleResponse}/>
    </div>
  )
}

export default App
