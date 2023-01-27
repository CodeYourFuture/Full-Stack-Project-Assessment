import React, { useState } from "react";
const AddVideo = ({newData}) => {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");

    const addVid = () =>{
    newData({title, url})
    }
return (
<div>
<label htmlFor="title">Title:</label>
<input type="text" id="title" value={title} className="input" onChange={(e)=> setTitle(e.target.value)}></input>
<br/>
<label htmlFor="url">Url:</label>
<input type="text" id="url" value={url} className="input" onChange={(e)=> setUrl(e.target.value)}></input>
<br/>
<input type="button" value="Add" className="addBtn" onClick={addVid}></input>

</div>)
}

export default AddVideo;
