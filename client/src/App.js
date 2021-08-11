import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import AddVideo from "./components/AddVideo/AddVideo";


const App = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
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
    </div>
  );
}

export default App;
