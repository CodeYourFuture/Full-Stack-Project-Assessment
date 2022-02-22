import React, {useEffect, useState} from "react";
import "./App.css";
import AddVideo from "../src/AddVideo";
import SearchInput from "./SearchInput";

//import ExampleResponse from "./data/exampleresponse.json";

function App() {
  const [videosData, setVideosData] = useState(null);
  useEffect(() => {
    fetch('http://127.0.0.1:5002/')
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => setVideosData(data));
  }, []);
  

  return videosData ? (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <main>
        <SearchInput />
        <AddVideo videoData={videosData} setVideosData = {setVideosData} />        
      </main>
    </div>
  ) : null;
}


export default App;
