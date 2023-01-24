import React, { useState } from "react";
import "./App.css";
import Video from "./Video";
import dataVideos from "./exampleresponse.json";
 import AddVideo from "./AddVideo";

function App() {
  const [del, setDel] = useState(dataVideos);

  const remove = (id) =>{
   let data = del.filter(x => x.id !== id);
    setDel(data);} 

const newData = (video) => { setDel([...del, video])};
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <div className="Add"><AddVideo newData={newData} /></div>
      <body>{del.map((video, key) => (
        <Video remove={remove}  video={video} key={key}/>
        ))}
      </body>
    </div>
  );
}


export default App;