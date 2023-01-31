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
function App() {
  const [data, setData] = useState([]);
  const [rating, setRating] = useState(0);

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
      <section className="Video-query">
      <SubmitVideo setData={setData} data={data} rating={rating} setRating={setRating} />
      <SearchBar data={data} setData={setData} />
      </section>
      <OrderedData data={data} />
      <DisplayVideos data={data} setData={setData} setRating={setRating} />
    </div>
  );
}

export default App;
