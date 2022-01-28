//to-do:
/*
  level 100:
  4. On the page there must be another React component that will add a Video.
   - It should include fields to add a
     - Title
     - Url
   - When a button is clicked the video should be added to the list
  5. Your website must follow accessibility guidelines (see below for more details)

*/

import "./App.css";
import "./VideoDisplay.jsx";
import { useState } from "react";

// placeholder data:
// import "../../exampleresponse.json"; <-- This causes problems so I moved the .json
// to this directory:
import originalData from "./exampleresponse.json";
import VideoDisplay from "./VideoDisplay.jsx";
// ready for real data:
// import { useEffect } from "react";

function App() {
  //just change dataClone to = the real data
  let [dataClone, setDataClone] = useState(originalData);
  //   ready for real data:
  //   useEffect(() => {
  //     fetch('url')
  //     .then(res => {
  //       if(res.ok){
  //         return res.json()
  //       }
  //       throw res;
  //     })
  //     .then(data => {
  //       //set the data to a variable
  //     })
  //     .catch(error => {
  //       console.log(`ERROR: ${error}`);
  //     })
  //   }, [])
  const removeIndex = (id) => {
    setDataClone(dataClone.filter(currentVid => currentVid.id !== id));
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>

      <div className="content">
        <VideoDisplay
          database={dataClone}
          remove={removeIndex}
        />
      </div>
    </div>
  );
}

export default App;
