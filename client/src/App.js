import "./App.css";
import data from "./exampleresponse.json";
import Header from "./Header";
import SearchVideo from "./SearchVideo";
import AddVideo from "./AddVideo";
import DisplayVideo from "./DisplayVideo";
import {useState, useEffect} from "react";



function App() {

const [showAddVideo, setShowAddVideo] = useState(false);
const [inputValue, setInputValue] = useState("");
const [videos, setVideos] = useState(data);
const [allVideos, setAllVideos] = useState(data);



useEffect(()=> {
let filter = allVideos.filter((video) => (
          video.title.toLowerCase().includes(inputValue.toLowerCase())
     ) )
     setVideos(filter);
}, [inputValue, allVideos]) 

function addVideo (video){
setAllVideos(allVideos.concat(video))
}


 function deleteVideo(id) {
  const newList = allVideos.filter((item) => item.id !== id);
  setAllVideos(newList);
  }


  return (
    <div className="App">
      <Header />
      <div className="add-search">
        <div className="add-video">
          <button onClick={()=> setShowAddVideo(true)}>Add Video</button>
          {showAddVideo && <AddVideo addVideo={addVideo}  showAddVideo={showAddVideo} setShowAddVideo={setShowAddVideo} /> } 
        </div>
        <div>
         <SearchVideo inputValue={inputValue} setInputValue={setInputValue} />
        </div>
      </div>
       <DisplayVideo deleteVideo={deleteVideo} videos={videos} />
    </div>
  );
}

export default App;
