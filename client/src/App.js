import React, { useState, useEffect } from "react";
import "./App.css";
import Search from "./Search";
import AddVideo from "./AddVideo";
import Footer from "./Footer";
function App() {
  const [allData, setAllData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const serverLocal = "http://localhost:5000";
  const serverLive = "https://flannel-hickory-parallelogram.glitch.me";
  useEffect(() => {
    fetch(`${serverLive}/videos`)
      .then((res) => res.json())
      .then((data) => {
        setAllData(data);
        setFilterData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(true);
      });
  }, []);

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h3 className="Header">Video List</h3>
        </header>
        <main className="main">
          <div>
            <AddVideo />
            <Search
              allData={allData}
              filterData={filterData}
              setAllData={setAllData}
              setFilterData={setFilterData}
              loading={loading}
              
            />
          </div>
        </main>
        <footer className="footer">
          <Footer className="Footer_style"/>
        </footer>
      </div>
    </>
  );
}

export default App;
