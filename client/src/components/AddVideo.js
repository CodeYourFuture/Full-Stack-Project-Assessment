import { useState } from "react";
import Moment from "react-moment";

const dateFormat = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${day}-${month}-${year}`;
};

const timeFormat = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${hours}-${minutes}-${seconds}`;
};
const AddVideo = (prop) => {
  const [title, settitle] = useState('');
  const [url, setUrl] = useState('');
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
 
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
    setDate(dateFormat(new Date()));
    setTime(timeFormat(new Date()));
       setNewVideo([
         {
           id: Math.floor(Math.random*100000000+1),
           title: title,
           url: url,
           rating: 222,
           date: date,
           time: time 
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