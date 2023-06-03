import Videos from "./Comp/Videos";
import AddVid from "./Comp/AddVid";
import data from "./Data/data.json";
import { useState } from "react";
import Header from "./Comp/Header";

console.log(data);
function App() {
  const [videos, setVideos] = useState(data);

  const onVideoDelete = (index) => {
    const videosCopy = [...videos];
    videosCopy.splice(index, 1);
    setVideos(videosCopy);
  };

  const onVideoLike = (index) => {
    const updatedVideos = videos.map((vid, currentIndex) => {
      if(currentIndex === index){
        return (
          {
            ...vid, 
            rating: vid.rating+1
          }
        )
      }
      return vid
    })
    setVideos(updatedVideos)
  };

  const onVideoDisLike = (index) => {
    const updatedVideos = videos.map((vid, currentIndex) => {
      if(currentIndex === index){
         return (
          {
            ...vid, 
            rating: vid.rating-1
          }
        )
      }
      return vid
    })
    setVideos(updatedVideos)
  };

  return (
    <div>
      <Header />
      <AddVid />
      <Videos videos={videos} onVideoDelete={onVideoDelete} onVideoLike={onVideoLike} onVideoDisLike={onVideoDisLike} />
    </div>
  );
}

export default App;
