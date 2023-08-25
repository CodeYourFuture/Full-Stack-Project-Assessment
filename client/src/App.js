import "./App.css";
import { useState, useEffect } from "react";
import VideoCard from './components/VideoCard'
import Video  from './components/video'


function App() {
  const[form,setForm]=useState(false)
  const [videolist, setVideolist] = useState([])

  useEffect(() => {
    async function getVideos() {
      const res = await fetch("http://localhost:5000/videos");
      const data = await res.json();
      setVideolist(data);
    }
    getVideos();
  }, []);
  
  return (
    <div className="container">
      <button onClick={()=>setForm(!form)}>Add Video</button>
      <Video form={form} videolist={videolist} setVideolist={setVideolist} />
      <div className="row">
        
        {videolist && videolist.sort((a, b) => b.rating - a.rating).map((item) => {
          return <div className="col-6 col-md-4" >
            <VideoCard key={item.id} item={item} setVideolist={setVideolist} videolist={videolist} /></div>


   
   })}
   </div>
    </div>
  );
}

export default App;