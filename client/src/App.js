import "./App.css";
import "./videoDisplay.jsx";

// placeholder data:
// import "../../exampleresponse.json"; <-- This causes problems so I moved the .json
// to this directory:
import originalData from "./exampleresponse.json";

import videoDisplay from "./videoDisplay.jsx";

// ready for real data:
// import { useEffect } from "react";

function App() {
  let dataClone = originalData;

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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <videoDisplay database={dataClone} />
    </div>
  );
}

export default App;
