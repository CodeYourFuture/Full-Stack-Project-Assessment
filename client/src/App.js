import React from "react";
import "./App.css";
import Search from "./Search";
import AddVideo from "./AddVideo";
import VideoList from "./VideoList";


function App() {
   fetch("http://localhost:5000/videos")
  .then(res=>res.json)
  .then(data=> console.log(data))
  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Video Recommendation</h1>
        </header>
        <main>
          <div>
            <AddVideo/>
           <Search/> 
          </div>
          <div>
            <VideoList/>
          </div>
        </main>
      </div>
      
    </>
  );
}

export default App;
