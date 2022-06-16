import React, { useState, useEffect } from "react";
import "./App.css";
import Search from "./Search";
import AddVideo from "./AddVideo";
import Footer from "./Footer";
function App() {
  const [allData, setAllData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [loading , setLoading] = useState(true);

  useEffect(()=>{fetch("https://flannel-hickory-parallelogram.glitch.me/videos")
      .then((res) => res.json())
      .then((data) => {
        setAllData(data);
        setFilterData(data);
        setLoading(false)
      })
      .catch((error) => {console.log(error);
      setLoading(true)})},[])
    
  
  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Video Recommendation</h1>
        </header>
        <main>
          <div>
            <AddVideo  />
            <Search
              allData={allData}
              filterData={filterData}
              setAllData={setAllData}
              setFilterData={setFilterData}
              loading={loading}
            />
          </div>
        </main>
        <footer className="Footer_style">
          <Footer  />
        </footer>
      </div>
    </>
  );
}

export default App;
