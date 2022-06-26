import React , {useState , useEffect} from "react";
import "./App.css";
import Homepage from "./components/Homepage";
import Video from "./components/Video";
import Response from "./exampleresponse.json";

const myVideo = Response;

const  App = ()=> {
  const[videoState , setVideoState ] = useState(myVideo);
  const filteredVideo = id => videoState.filter(video => video.id !== id)

  const AddVideo = () => {
    
  const [addFormVideo , setAddFormVideo] = useState({
    title : "" ,
    url : ""
  })
  const handleAddFormChange = (event) => {
    event.preventDefault();

    let fieldName = event.target.getAttribute('name');
      let fieldValue = event.target.value;
      let newVideoData = { ...addVideoData };
      newVideoData[fieldName] = fieldValue;
      setAddVideoData(newVideoData)
    }

    const newVideos = [...]
  }
}
  return (
    <div className="App">
      <div>
        <h2 className="add-video-bar">Add New Video : </h2>
        <form>
          <input
            type="text"
            name="title"
            required="required"
            placeholder="Enter video ..."
          />
        </form>
        <button type="submit" className="add-button">
          Add
        </button>
      </div>
      
      <Homepage />
      <Video />
    </div>
  );
}

export default App;
