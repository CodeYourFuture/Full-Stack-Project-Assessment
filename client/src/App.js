import "./App.css";
import React, { useState } from "react";
import VideoList from "./VideoList";
import videos from "./exampleresponse.json";


function App() {
  const [data, setData] = useState(videos);

  const deleteHandler = (e) => {
    let newState = data.filter((video) => {
      return video.id !== parseInt(e.target.id);
    });
    setData(newState);
  };

  // const addToggle=()=> {

  // }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>


      <VideoList delete={deleteHandler} data={data} />
      
      
      
      <div> {" "}
        Icons made by{" "} <a href="https://www.flaticon.com/authors/gregor-cresnar" title="Gregor Cresnar" >
          {" "} Gregor Cresnar{" "}
        </a>{" "} from{" "} <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com' </a>
      </div>


    </div>
  );
}

export default App;
