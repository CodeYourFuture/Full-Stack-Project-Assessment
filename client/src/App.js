import React, { useState, useEffect } from "react";
import "./App.css";
import Search from "./Search";
import AddVideo from "./AddVideo";
import Footer from "./Footer";
import Header from "./Header";
function App() {
  const [allData, setAllData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const serverLocal = "http://localhost:5000";
  const serverLive = "https://cyf-fullstack-alirezabg.herokuapp.com";
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
        <Header/>
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
