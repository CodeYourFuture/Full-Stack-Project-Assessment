import "./App.css";
// import data from "./exampleresponse.json";
import Header from "./Header";
import SearchVideo from "./SearchVideo";
import AddVideo from "./AddVideo";
import DisplayVideo from "./DisplayVideo";
import {useState, useEffect} from "react";



function App() {

const [showAddVideo, setShowAddVideo] = useState(false);
const [inputValue, setInputValue] = useState("");
const [videos, setVideos] = useState([]);
const [allVideos, setAllVideos] = useState([]);

// const [allVideos, setAllVideos] = useState(null);

useEffect(()=> {
fetch("http://127.0.0.1:5000")
      .then((res) => res.json())
      .then((allVideos) => setAllVideos(allVideos));
},[])


useEffect(()=> {
let filter = allVideos.filter((video) => (
          video.title.toLowerCase().includes(inputValue.toLowerCase())
     ) )
     setVideos(filter);
}, [inputValue, allVideos]) 


function addVideo (video){

  fetch("http://127.0.0.1:5000", {
  method: "POST", 
  headers: {
          'Content-Type': 'application/json',
      },
  body: JSON.stringify(video)
}).then(res => {
  console.log("Request complete! response:", res);
});
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
