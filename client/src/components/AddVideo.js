import React,{ useState } from "react";

const AddVideo = (prop) => {
  console.log('hi')
  const [title, settitle] = useState('j');
  const [url, setUrl] = useState('j');
 
  const [clicked, setClicked] = useState(false);
  const [newvideo, setNewVideo] = useState([{}]);
  const [newvideoapi, setNewVideoapi] = useState([]);
  const handleChange = (e) => {
    if (e) {
      if (e.target.name === "title") {
        settitle(e.target.value);
      } else if (e.target.name === "url") {
        setUrl(e.target.value);
      }
    }
  
    // setDate(dateFormat(new Date()));
    // setTime(timeFormat(new Date()));
    //
  
    setNewVideo([
      {
        //       //id: Math.floor(Math.random() * 100000000) + 1,
        title: title,
        url: url
        //       //rating: 0,
        //       // date: date,
        //       // time: time,
      },
    ]);
  }
  const handleClick = () => {
    setClicked(true);
  };
  const handleDelete = () => {
    document.getElementById("addvideoform").reset();
    setClicked(false);
  };
  
  const handleAdd = (e) => {

    e.preventDefault();
    fetch('http://127.0.0.1:5000/', {
      method: "post",
      headers: { "Accept": "application/json", "Content-type": "application/json" },
      body: JSON.stringify({ title: title, url: url }),
      
    })

      //prop.inputVideo();
      .then((res) => res.json())
      .then((newVideos) => {
       
        prop.input(newVideos);
        
      })
  }
  
  return (
    <>
      <h2 className="addVideo" onClick={() => handleClick()}>
        Add Video
      </h2>
      <form      
        
        style={{ display: clicked ? "flex" : "none" }}
        className="addvideo-form"
        id="addvideoform"
      >
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

        
       
        <div className="addvideo">
          <button type='submit' onClick={(e) => { handleAdd(e)} }>
            Add Video
           </button>
          {/* <button type='submit' onClick={() => prop.onClick()}>Add</button> */}
          <button onClick={(e) => handleDelete()}>Delete</button>
        </div>
      </form>{" "}
    </>
  );
};

export default AddVideo;
