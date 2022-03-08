import "./App.css";
import { useState, useEffect } from "react";
import VideoListDisplay from "./VideoListDisplay.jsx";
import VideoSubmissionForm from "./VideoSubmissionForm.jsx";

function App() {
  let [dataClone, setDataClone] = useState([]);
  //fetch data
  useEffect(() => {
    fetch(`http://localhost:5000/`)
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
  }, [dataClone]);

  const removeIndex = (id) => {
    fetch(`http://localhost:5000/${id}`, {method:"delete"})
    .catch((error) => {
      console.error(error);
      throw error;
    });
    //update data clone
    setDataClone(dataClone.filter((currentVid) => currentVid.id !== id));
  };
  
  const addVideoFromInput = (userInput) => {
    console.log(userInput);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "title": userInput.title, "url": userInput.url }),
    };
    fetch(`http://localhost:5000/`, requestOptions)
    .then(() => {
      //update the dataClone causing a recall of new data
      setDataClone((oldData) => [
        ...oldData,
        {
          title: userInput.title,
          url: userInput.url,
        },
      ]);
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
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
