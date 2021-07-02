import "./App.css";
import VideosContainer from "./components/VideosContainer/VideosContainer";
import Header from "./components/Header/Header";
import AddVideo from "./components/AddVideo/Addvideo";
import Search from "./components/Search/Search";
import SortButton from './components/Sortbutton/Sortbutton';
import {useState,useEffect} from "react";
function App() {
  const [showAddVideo, setShowAddVideo] = useState(false);
  const [sortVideoButton, setSortVideoButton] = useState("Descending");
  const [displayVideos, setDisplayVideos] = useState([]);


  useEffect(() => {
    fetch("http://127.0.0.1:5000/")
      .then(response => response.json())
      .then(data => {
        setDisplayVideos(data);
    
    }).catch(error => alert("something is wrong"));
    }, [])


// Function to delete a video with ID
  const deleteVideo = (id) => {
    const newList = displayVideos.filter((item) => item.id !== id);
    setDisplayVideos(newList);
    
  };

// Function to add a video  
const addVideo = (video) =>{
  setDisplayVideos(displayVideos.concat(video))
}

  const handleSort = (event) => {
      const buttonSort = event.target.textContent;
      if(buttonSort === "Descending"){
          setSortVideoButton("Ascending")
          displayVideos.sort( (a, b) => a.rating > b.rating ? -1 : 1)
         
      } else {
          setSortVideoButton("Descending")
          displayVideos.sort( (a, b) => a.rating > b.rating ? 1 : -1)
      }
  }


    const handleSearch = (event) => {
          const searchedVideo = event.target.value.toLowerCase();
          const selectedVideo = displayVideos.filter((obj) => {
              return (obj.title.toLowerCase().includes(searchedVideo))
          });
           setDisplayVideos(selectedVideo);
     }


  return (
    <div className="App">
      <header className="App-header">
          <Header />
            <div className="sort-btn-container">
              <SortButton  sortVideoButton = {sortVideoButton} handleSort = {handleSort}/>
          </div>
          
        
          <Search handleSearch = {handleSearch} />
          <div className="add-video">
              <button className="add" onClick={()=> setShowAddVideo(true)}>Add Video</button>
              {showAddVideo && <AddVideo addVideo={addVideo}  showAddVideo={showAddVideo} setShowAddVideo={setShowAddVideo} /> } 
          </div>
          <VideosContainer deleteVideo={deleteVideo} videoData= {displayVideos} setDisplayVideos = {setDisplayVideos}  />
      </header>
    </div>
  );
}

export default App;
