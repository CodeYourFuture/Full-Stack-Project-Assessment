import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import AddVideo from "./AddVideo";
import Search from "./Search";




function App() {

  const herokuDB = "https://full-stack-project-assessment.herokuapp.com/videos"

  const [allData, setAllData] = useState([]);
  const [filterVideo, setFilterVideo] = useState([]);

  useEffect(() => {
    fetch(herokuDB)
      .then((res) => res.json())
      .then((data) => {
        setAllData(data);
        setFilterVideo(data);

      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  return (
    <div className="App">
      <Header />
      <div>
        <AddVideo setFilterVideo={setFilterVideo} />
        <Search
          allData={allData}
          filterVideo={filterVideo}
          setAllData={setAllData}
          setFilterVideo={setFilterVideo}
        />
      </div>
    </div>
  );
}

export default App;





// https://reactjs.org/docs/lists-and-keys.html

//const after_ = str.substring(str.indexOf('https://www.youtube.com/watch?v=‘) + 1); 