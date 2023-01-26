import "./App.css";
import { useState } from "react";
import Videos from "./data/exampleresponse.json";
import DisplayVideos from "./components/DisplayVideos";
import SubmitVideo from "./components/SubmitVideo";
import SearchBar from "./components/SearchBar";

//getAllData, addVideo, DeleteVideo fetch data from backend
// createSQL AND connect to DB
function App() {
  const [data, setData] = useState(Videos);
  const [backup, setBackup] = useState(Videos);

  return (
    <div className="App">
      <header className="App-header">
        <br></br>
        <br></br>
        <h1>...Video Recommendation...</h1>
        <div>
          <SubmitVideo setData={setData} data={data} />

          <SearchBar data={data} setData={setData} backup={backup} />
        </div>
        <br></br>
        <br></br>
        <DisplayVideos data={data} setData={setData} />
      </header>
    </div>
  );
}

export default App;
