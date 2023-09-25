import AddVideoButton from "./AddVideoButton";
import "./App.css";
import CardHolder from "./CardHolder";
import { useEffect, useState } from "react"



function App() {
  const [allMyVideos, setAllMyVideos] = useState([])


  useEffect(() => {
    fetch("https://youtube-video-server.onrender.com/videos")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setAllMyVideos(data)
      })
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AddVideoButton setAllMyVideos={setAllMyVideos} />
      <CardHolder allMyVideos={allMyVideos} setAllMyVideos={setAllMyVideos} />
    </div>
  );
}

export default App;
