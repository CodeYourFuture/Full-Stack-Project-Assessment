import "./App.css";
import Videos from "/Users/admin/Desktop/Newsletter-Signup/Full-Stack-Project-Assessment/client/src/Components/Videos.js"
import React, {useEffect, useState} from "react";
// import { response } from "express";

function App() {

const [backendData, setBackendData] = useState([])

// useEffect(() => {
//   fetch("/api/").then(
//     response => response.json()
//   ).then(
//     data => {
//       setBackendData(data)
//     }
//   )
// }, [])

// useEffect(() => {
//   fetch("/").then(res => {
//     if(res.ok) {
//       return res.json()
//     }
//   }).then(jsonRes => setBackendData(jsonRes.videos))
// })

useEffect(() =>{
  fetch("/api/").then(res => {
    if(res.okay){
      return res.json()
    }
  }).then(jsonResponse => setBackendData(jsonResponse.videos))
},[])

  return (
    <div className="App">
{/* {(typeof backendData.videos ==="undefined") ? (
<h1>Loading...</h1>

) : (
  backendData.videos.map((video, i) => (
    <p key={i}>{video}</p>
  ))
)} */}


{/* {backendData.map(data => 
<p key={data.id}>{data.title}</p>

)} */}


{backendData.length > 0 && backendData.map((e,i) => <li key={i}>{e}</li>)}



        <header className="App-header">
        <h1>Video Recommendation</h1>
        <Videos />
      </header>
    </div>
  );
}

export default App;
