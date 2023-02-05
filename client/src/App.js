import React,{useState} from "react";
import "./App.css";
import exampleresponse from "./exampleresponse.json";
import VideoList from "./component/VideoList";
import AddVideo from "./component/AddVideo";

function App() {
  const [videos,setVideos]=useState(exampleresponse)

  const upVote=(id)=>{
    setVideos(prevVideos=>{
      prevVideos.map(video=>{
        if(video.id===id){
          return {...video,rating: video.rating+1}
        }
        return video;
      })
    })
  }

  const downVote=(id)=>{
    setVideos(prevVideos=>{
      prevVideos.map(video=>{
        if(video.id===id){
          return{...video,rating:video.rating-1}
        }
        return video;
      })
    })
  }

  const removeVideo=id=>{
    setVideos(prevVideos=>prevVideos.filter(video=>video.id!==id));
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
