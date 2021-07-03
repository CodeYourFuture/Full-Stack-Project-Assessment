import React, { useState, useEffect } from "react"
import "./App.css";
import Header from "../src/components/Header";
import AddVideo from "../src/components/AddVideo";
import Search from "../src/components/Search";
import VideoCards from "../src/components/VideoCards";

const App = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // fetch("https://askin-full-stack-project-db.herokuapp.com")
    fetch("http://localhost:5000")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error))
  }, [data]);

  return (
    <div className="App">
      <Header />
      <AddVideo
        data={data}
        setData={setData}
      />
      <Search
        search={search}
        setSearch={setSearch}
      />
      <VideoCards
        data={data}
        setData={setData}
        search={search}
      />
    </div>
  );
}

export default App;
