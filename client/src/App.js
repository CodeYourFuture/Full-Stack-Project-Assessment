import "./App.css";
import VideosContainer from "./components/VideosContainer/VideosContainer";
import videos from './data/exampleresponse.json';
import Header from "./components/Header/Header";
import {useState} from "react";
function App() {
  
  const [allVideos, setAllVideos] = useState(videos);



// Function to delete a video with ID
  const deleteVideo = (id) => {
    const newList = allVideos.filter((item) => item.id !== id);
    setAllVideos(newList);
    console.log(newList);
    
  };


  return (
    <div className="App">
      <header className="App-header">
        <Header/>
         <VideosContainer  deleteVideo={deleteVideo} videoData={allVideos} />
      </header>
    </div>
  );
}

export default App;
