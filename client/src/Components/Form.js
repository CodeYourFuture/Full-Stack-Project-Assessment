import React, {useState} from "react";
import "./Form.css";



// Task:
//On the page there must be another React component that will add a Video.
//    - It should include fields to add a
//      - Title
//      - Url
//    - When a button is clicked the video should be added to the list

//Validation 
// const isValidInput = (title, url) => {
//   const isValidTitle = typeof title === "string" && title.trim() !== "";
//   const isValidUrl =
//     typeof url === "string" &&
//     /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}($|&list=[\w-]+)/.test(
//       url
//     );
//   return isValidTitle && isValidUrl;
// };



function Form({onAddVideo}) {
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
        <button onClick={handleSubmit} >
        ADD
      </button>
      {/* <button onClick={handleOrderChange} disabled={fetching}>
        {order === "desc" ? "Desc" : "Asc"}
      </button>
      {errorMessage && <div className="error-message">{errorMessage}</div>} */}
  
      </div>
    );
}

export default Form;
