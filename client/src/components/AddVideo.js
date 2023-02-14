import React,{useState} from 'react'
import VideoList from './VideoList';


const AddVideo = () => {
  const [title, setTitle]= useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    
  }


  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Add Video Title</label>
          <input type="text" id='title' value={title} onChange={(e) => setTitle(e.target.value)} />

          <label htmlFor="url">Add Video Url</label>
          <input type="text" id='url' value={url} onChange={(e) => setUrl(e.target.value)}/>

          <button className='add-video' onClick={handleSubmit}>Add Video</button>
          <button className='cancel-video'  >Cancel</button>
          
        </form>
        <VideoList/>
      </div>
    </div>
  )
}

export default AddVideo