import React,{useState,useEffect} from "react";
import "./App.css";
import VideoList from "./component/VideoList";
import AddVideo from "./component/AddVideo";

function App() {
  const [videos,setVideos]=useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:5000/");
      const data = await response.json();
      setVideos(data);
    }
    fetchData();
  }, []);

  const upVote=(id)=>{
    setVideos(prevVideos=>{
    return  prevVideos.map(video=>{
        if(video.id===id){
          return {...video,rating: video.rating+1}
        }
        return video;
      })
    })
  }

  const downVote=(id)=>{
    setVideos(prevVideos=>{
     return prevVideos.map(video=>{
        if(video.id===id){
          return{...video,rating:video.rating-1}
        }
        return video;
      })
    })
  }

  const removeVideo=id=>{
    fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => {
        setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id)) })
      .catch((error) => {
        console.error("There was a problem deleting the video: ", error);
      });
   
  }

  const addVideo=video=>{
    setVideos(prevVideos=>[...prevVideos,video])
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AddVideo addVideo={addVideo} />
      <VideoList
        videos={videos}
        upVote={upVote}
        downVote={downVote}
        removeVideo={removeVideo}
      />
    </div>
  );
}

export default App;
