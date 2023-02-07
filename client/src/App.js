import "./App.css";
import { useState } from "react";
import exampleresponse from '../src/data/exampleresponse.json'
import VideoCard from './components/VideoCard'
import Video  from './components/video'


function App() {
  const[form,setForm]=useState(false)
  const [videolist,setVideolist]=useState(exampleresponse)
  
  return (
    <div className="container">
      <button onClick={()=>setForm(!form)}>Add Video</button>
      <Video form={form} videolist={videolist} setVideolist={setVideolist} />
      <div className="row">
        
   {videolist.map((item)=> {return <div className="videoList">
    <VideoCard key={item.id} item={item} setVideolist={setVideolist} videolist={videolist}/></div>

   
   })}
   </div>
    </div>
  );
}

export default App;