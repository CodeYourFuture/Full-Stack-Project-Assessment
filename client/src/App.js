import AddVideoButton from "./AddVideoButton";
import "./App.css";
import CardHolder from "./CardHolder";
import { useEffect, useState } from "react"



function App() {
  const [allMyVideos, setAllMyVideos] = useState([])


  useEffect(() => {
    fetch("http://ec2-13-42-39-111.eu-west-2.compute.amazonaws.com/videos")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setAllMyVideos(data)
      })
  }, [])
  return (
    <div className="App">
      <div className="background"></div>
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AddVideoButton setAllMyVideos={setAllMyVideos} />
      <div style={{ width: "98%" }}>
        <CardHolder allMyVideos={allMyVideos} setAllMyVideos={setAllMyVideos} />
      </div>
    </div>
  );
}

export default App;
