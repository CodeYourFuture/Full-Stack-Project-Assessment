import "./App.css";
import { useState, useEffect } from "react";
// import Videos from "./data/exampleresponse.json";
import DisplayVideos from "./components/DisplayVideos";
import SubmitVideo from "./components/SubmitVideo";
import SearchBar from "./components/SearchBar";

//getAllData, addVideo, DeleteVideo fetch data from backend
// createSQL AND connect to DB
function App() {
  const [data, setData] = useState([]);
  const [backup, setBackup] = useState(data);

   useEffect(() => {
     fetch("http://127.0.0.1:3000/videos")
       .then((res) => res.json())
       .then((data) => setData(data))
       .catch((error) => console.error(error));
   }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>...Video Recommendation...</h1>
      </header>
      <div className="Modify-Video">
        <SubmitVideo setData={setData} data={data} />
        <SearchBar data={data} setData={setData} backup={backup} />
      </div>
      <DisplayVideos data={data} setData={setData} />
    </div>
  );
}

export default App;
