import React, {useState} from "react";
import "./Form.css";



function Form({onAddVideo, }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
 

  const handleTitleChange =(event) => {
    setTitle(event.target.value);
  };

  const handleUrlChamge = (event)=>{
    setUrl(event.target.value);
  };

  const handleSubmit = (event) =>{
    event.preventDefault();
    const currentDate = new Date();
  const id = currentDate.getTime(); // Use the timestamp as the ID
    const newVideo= {
        id: id,
        title: title,
        url: url,
        rating: 0,
    };
    onAddVideo(newVideo);
    setTitle('');
    setUrl ('');
  };

  
    return(
      
        <div className="form" >
        <a href="#">Add Videos</a>
        <div id="form">
          <form action="#" method="get">
            <label htmlFor="title">Title</label>
            <input type="text" 
            id="title" 
            name="title"
            placeholder="Title" 
            value = {title} 
            onChange={handleTitleChange} 
            required/><br />
            <label htmlFor="url">URL</label>
            <input type="text" 
            id="url" 
            name="url" 
            placeholder="URL" 
            value={url}  
            onChange={handleUrlChamge} 
            required/><br />
          </form>
        </div>
        <button className="add-button" onClick={handleSubmit} >
        ADD
      </button>
      
      </div>
    );
}

export default Form;
