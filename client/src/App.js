import "./App.css";
import { useState, useEffect } from "react";
//import axios from "axios";
// import Videos from "./data/exampleresponse.json";
import DisplayVideos from "./components/DisplayVideos";
import SubmitVideo from "./components/SubmitVideo";
import SearchBar from "./components/SearchBar";
import OrderedData from "./components/OrderedData";

//getAllData, addVideo, DeleteVideo fetch data from backend
// createSQL AND connect to DB
function App({ upVote }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/videos")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>...Video Recommendation...</h1>
      </header>
      <OrderedData data={data} />
      <SearchBar data={data} setData={setData} />
      <SubmitVideo setData={setData} data={data} upVote={upVote} />
      <DisplayVideos data={data} setData={setData} upVote={upVote} />
    </div>
  );
}

export default App;
