import React, {useState} from 'react';

const AddVideo = ({addVideo, showAddVideo, setShowAddVideo}) => {
const [add, setAdd] = useState({title: "", url: ""});


function onClickHandler(){
  addVideo(add);
  setAdd({title: "", url: ""});
}

    return (
        <div>
            
          
            <label>Title </label>
            <input type="text" value={add.title} onChange={(e)=> setAdd({...add, title: e.target.value})}></input>
            <br />
            <label>URL </label>
            <input type="text" value={add.url} onChange={(e)=> setAdd({...add, url: e.target.value})}></input>
            <br />
            <button onClick={() => setShowAddVideo(false)}>Cancel</button>
            <button onClick={onClickHandler}>Add</button>
          
        </div>
    )
}

export default AddVideo;
