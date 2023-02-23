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
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input type="text" id='title' value={title} onChange={(e) => setTitle(e.target.value)} />

          <label htmlFor="url">Url</label>
          <input type="text" id='url' value={url} onChange={(e) => setUrl(e.target.value)}/>

          <button className='add-video' onClick={handleSubmit}>Add Video</button>
          
          
        </form>
        <VideoList/>
      </div>
  
  )
}

export default AddVideo