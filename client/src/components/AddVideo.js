import { useState } from "react";

const AddVideo = (video) => {
  const [allvideos, setAllVideos] = useState(video.video);
  const [newvideo, setNewVideo] = useState(null);
  //console.log(allvideos);
  const [addDisplay, setAddDisplay] = useState(false);
  const addVideoDisplay = () =>
  {
    setNewVideo({
      id: 283634,
      title: "Learn Unity - Beginner's Game Development Course",
      url: "https://www.youtube.com/watch?v=gB1F9G0JXOo",
      rating: 211,
    });
  setAddDisplay(true);
  }

  const set=() => {
   setNewVideo({
      id: 283634,
      title: "Learn Unity - Beginner's Game Development Course",
      url: "https://www.youtube.com/watch?v=gB1F9G0JXOo",
      rating: 211,
    });
  }
   
  const deleteDisplay = () => {
   
    
      setAddDisplay(false);
    };
  
  const inputVideo = () => {
    
    set();
    //setAddDisplay(true);
    console.log(newvideo);
    setAllVideos([...allvideos, newvideo]);
    
  
  }

  
  console.log(allvideos);
    return (
      <>
        
        <h2 onClick={() => addVideoDisplay()}className="addVideo">Add Video</h2>
        <form className="addvideo-form" >
          <div className="addvideo">
            <label htmlFor="title" name="title">
              Title:
              <input className="input" type="text" name="title"  />
            </label>
          </div>
          <div className="addvideo">
            <label htmlFor="url" name="url">
              {" "}
              URL:
              <input className="input" type="text" name="url"  />
            </label>
          </div>

          <div className="addvideo">
            <button onClick={()=> inputVideo()} >Add</button>
          <button onClick ={() => deleteDisplay()}>Delete</button>
          </div>
        </form>{" "}
      </>
    );
 }








export default AddVideo;