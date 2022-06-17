import React, {useState,useEffect} from "react";
import "./App.css";
import Header from "./Header";
import AddVideo from "./AddVideo";
import Search from "./Search";




function App() {

  const [allData, setAllData] = useState([]);
  const [filterVideo, setFilterVideo] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/videos")
    .then((res) => res.json())
    .then((data) => {
      setAllData(data);
      setFilterVideo(data);
     
    })
    .catch((error) => {
      console.log(error);
    })
  }, [])
 
  return (
    <div className="App">
      <Header />
      <div>
        <AddVideo/>
        <Search 
             allData ={allData}
             filterVideo ={filterVideo}
             setAllData={setAllData}
          setFilterVideo={setFilterVideo} 
          />
      </div>
    </div>
  );
}

export default App;





// https://reactjs.org/docs/lists-and-keys.html

//const after_ = str.substring(str.indexOf('https://www.youtube.com/watch?v=‘) + 1); 