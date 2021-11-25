import { useState } from "react";

const AddVideo = (prop) => {
  const [title, settitle] = useState('');
  const [url, setUrl] = useState('');
 
  const [newvideo, setNewVideo] = useState([{}]);  
  const handleChange = (e) => {
    if (e) {
      if (e.target.name === 'title') {
        settitle(e.target.value);
      }
         
      else if (e.target.name === 'url') {
        setUrl(e.target.value);
      console.log(e.target.value)}
    }
       setNewVideo([
         {
           id: Math.floor(Math.random*100000000+1),
           title: title,
           url: url,
           rating: 222,
         },
       ]);
     console.log(newvideo)
    

  }


  
  return (
    <>
      <h2 className="addVideo">Add Video</h2>
      <form className="addvideo-form" onSubmit={(e) => e.preventDefault()}>
        <div className="addvideo">
          <label htmlFor="title" name="title">
            Title:
            <input
              className="input"
              type="text"
              name="title"
              onChange={(e) => handleChange(e)}
              required
            />
          </label>
        </div>
        <div className="addvideo">
          <label htmlFor="url" name="url">
            {" "}
            URL:
            <input
              className="input"
              type="url"
              name="url"
              onChange={(e) => handleChange(e)}
              required
            />
          </label>
        </div>
        {console.log(newvideo)}
        <div className="addvideo">
          <button onClick={() => prop.onClick(newvideo)}>Add</button>
          <button>Delete</button>
        </div>
      </form>{" "}
    </>
  );
 }








export default AddVideo;