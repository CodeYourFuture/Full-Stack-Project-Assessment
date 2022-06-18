import React, { useState, useEffect } from "react";
import "./App.css";
import RenderVideos from "./Components/rendervideos/renderVideos";
import AddLink from "./Components/addLink/addLink";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/").then((v) => {
      setData(v.data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <AddLink setData={setData} />
        <RenderVideos data={data} setData={setData} />
      </header>
    </div>
  );
}

export default App;
