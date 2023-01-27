import React, { useEffect, useState } from "react";
import "./App.css";
import Video from "./Video";
import dataVideos from "./exampleresponse.json";
import Insert from "./insert";
import Switch from "@mui/material/Switch";

function App() {
  const [orderLabel, setOrderLabel] = useState(false);
  const [orderedData, setOrderedData] = useState(dataVideos);
  const handleOrder = () => {
    setOrderLabel(!orderLabel);
  };

  useEffect(() => {
    const url = `order/?by=${orderLabel ? "asc" : "desc"}`;
    fetch(url, { method: "get" })
      .then((res) => res.json())
      .then((data) => {
        setOrderedData(data);
      });
  }, [orderLabel]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        Sort by {orderLabel ? "Ascending" : "Descending"}{" "}
        <Switch defaultChecked onClick={handleOrder} />
      </header>
      <main>
        <div className="insert">
          <Insert />
        </div>
        <br></br>
        <div>
          {orderedData.map((video, key) => (
            <Video video={video} key={key} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
