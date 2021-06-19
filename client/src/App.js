import React, { useState } from "react"
import "./App.css";
import Header from "../src/components/Header";
import AddVideo from "../src/components/AddVideo";
import Search from "../src/components/Search";
import VideoCards from "../src/components/VideoCards";
import staticData from "../src/data/exampleresponse.json";

const App = () => {
  const [data, setData] = useState(staticData);
  const [search, setSearch] = useState("");

  return (
    <div className="App">
      <Header />
      <div className="d-flex">
        <AddVideo
          data={data}
          setData={setData}
        />
        <Search
          search={search}
          setSearch={setSearch}
        />
      </div>
      <VideoCards
        data={data}
        setData={setData}
        search={search}
      />
    </div>
  );
}

export default App;
