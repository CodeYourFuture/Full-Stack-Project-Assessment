import React, { useState, useEffect } from "react";
import "./App.css";
// import 'bootstrap/dist/css/bootstrap.css';
import Header from "./Header";
// import exampleresponse from "./data/exampleresponse.json";
import Video from "./Video";
import AddVideo from "./AddVideo";


function App() {
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    console.log("Fetching data from loal server");

    fetch(`http://localhost:5000/`, {
      mode: 'cors'
    })
    .then((res) =>{
      if (res.status <= 200) {
        return res.json();
      } else {
        throw new Error(`Error ${res.status} : ${res.statusText}`);
      }
    })
    .then((data) =>
        setVideoList(data))
  }, []);

  return (
    <main>
      <Header />
      <AddVideo videoList={videoList} setVideoList={setVideoList} />
      <div className="videos-outer-wrap">
        <Video videoList={videoList} setVideoList={setVideoList} />
      </div>
    </main>
  );
}

export default App;
