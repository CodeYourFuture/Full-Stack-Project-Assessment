import "./App.css";
import "./VideoDisplay.jsx";

// placeholder data:
// import "../../exampleresponse.json"; <-- This causes problems so I moved the .json
// to this directory:
import originalData from "./exampleresponse.json";
import VideoDisplay from "./VideoDisplay.jsx";
// ready for real data:
// import { useEffect } from "react";

function App() {
  //just change dataClone to = the real data
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
      {/* data test - WORKS */}
      {/* {dataClone.map((x) => {
        return(
          <p>{x.title}</p>
        )
      })} */}

      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <div className="content">
        <VideoDisplay database={dataClone}/>
      </div>
    </div>
  );
}

export default App;
