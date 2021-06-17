import "./App.css";
import VideosContainer from "./components/VideosContainer/VideosContainer";
import videos from './data/exampleresponse.json';
import Header from "./components/Header/Header";
import AddVideo from "./components/AddVideo/Addvideo";
import {useState} from "react";
function App() {
  
  const [allVideos, setAllVideos] = useState(videos);
  const [showAddVideo, setShowAddVideo] = useState(false);


// Function to delete a video with ID
  const deleteVideo = (id) => {
    const newList = allVideos.filter((item) => item.id !== id);
    setAllVideos(newList);
    console.log(newList);
    
  };

// Function to add a video  
const addVideo = (video) =>{
   setAllVideos(allVideos.concat(video))
}


  return (
    <div className="App">
      <header className="App-header">
        <Header/>

         <div className="add-video">
          <button className="add" onClick={()=> setShowAddVideo(true)}>Add Video</button>
          {showAddVideo && <AddVideo addVideo={addVideo}  showAddVideo={showAddVideo} setShowAddVideo={setShowAddVideo} /> } 
        </div>

         <VideosContainer  deleteVideo={deleteVideo} videoData={allVideos} />
      </header>
    </div>
  );
}

export default App;
