import "./App.css";
import VideosContainer from "./components/VideosContainer/VideosContainer";
//import videos from './data/exampleresponse.json';
import Header from "./components/Header/Header";
import AddVideo from "./components/AddVideo/Addvideo";
import Search from "./components/Search/Search";
import {useState,useEffect} from "react";
function App() {
  
  const [allVideos, setAllVideos] = useState([]);
  const [showAddVideo, setShowAddVideo] = useState(false);
  const [search, setSearch] = useState("");
  // const [sorted, setSorted] = useState('');
  // const [videosArrUpdated, setVideosArrUpdated] = useState(1);

  useEffect(() => {
    fetch("http://localhost:5000")
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("There is an error with the service");
        }
      })
      .then((allVideos) => {
        setAllVideos(allVideos)
        console.log(allVideos);
      })
      .catch(e => console.log(e));    
  }, [])


  // useEffect(() => {
  //   fetch(`http://localhost:5000/?order=${sorted}`)
  //     .then(res => res.json())
  //     .then(allVideos => setAllVideos(allVideos))
  //     .catch(err => console.error(err))
  // }, [sorted, videosArrUpdated])


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
        <Header />
        <Search search={search} handleSearch={(e) => setSearch(e.target.value)}/>
         <div className="add-video">
          <button className="add" onClick={()=> setShowAddVideo(true)}>Add Video</button>
          {showAddVideo && <AddVideo addVideo={addVideo}  showAddVideo={showAddVideo} setShowAddVideo={setShowAddVideo} /> } 
        </div>

       
      
         <VideosContainer  deleteVideo={deleteVideo} videoData={allVideos} search={search}/>
      </header>
    </div>
  );
}

export default App;
