import React, { useState } from "react";
const AddVideo = ({newData}) => {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");

    const addVid = () =>{
    newData({title, url})
    }
return (
<div>
<label for="title">Title:</label>
<input type="text" id="title" value={title} onChange={(e)=> setTitle(e.target.value)}></input>
<br/>
<label for="url">Url:</label>
<input type="text" id="url" value={url} onChange={(e)=> setUrl(e.target.value)}></input>
<br/>
<input type="button" value="Add" onClick={addVid}></input>

</div>)
}

export default AddVideo;
