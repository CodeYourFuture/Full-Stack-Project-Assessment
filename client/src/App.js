import AddVideoButton from "./AddVideButton";
import "./App.css";
import CardHolder from "./CardHolder";
import allVideos from "./exampleresponse.json"
import { useEffect, useState } from "react"



function App() {
  const [allMyVideos, setAllMyVideos] = useState([])
  useEffect(() => {
    setAllMyVideos(allVideos)
    console.log(allMyVideos)
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AddVideoButton />
      <CardHolder allMyVideos={allMyVideos} setAllMyVideos={setAllMyVideos} />
    </div>
  );
}

export default App;
