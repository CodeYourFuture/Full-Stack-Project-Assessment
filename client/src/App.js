import "./App.css";
import { useState, useEffect } from "react";
import VideoListDisplay from "./VideoListDisplay.jsx";
import VideoSubmissionForm from "./VideoSubmissionForm.jsx";

function App() {
  let [dataClone, setDataClone] = useState([]);
  //fetch data
  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        setDataClone(data);
      })
      .catch((error) => {
        console.log(`ERROR: ${error}`);
      });
  }, [])

  const removeIndex = (id) => {
    setDataClone(dataClone.filter((currentVid) => currentVid.id !== id));
  };
  
  const addVideoFromInput = (userInput) => {
    const videoId = userInput.url.split("=")[1];
    setDataClone((oldData) => [
      ...oldData,
      {
        id: videoId,
        title: userInput.title,
        url: userInput.url,
        rating: 0,
      },
    ]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>

      <div className="content">
        <VideoSubmissionForm addVidFunc={addVideoFromInput} />
        <VideoListDisplay database={dataClone} remove={removeIndex} />
      </div>
    </div>
  );
}

export default App;
