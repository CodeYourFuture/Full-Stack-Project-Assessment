import React,{useState} from 'react'
import "./Addvideo.css";
const Addvideo = ({addVideo,setShowAddVideo}) => {
    const [add, setAdd] = useState({title: "", url: ""});

   const onClickHandler =  () =>{
        addVideo(add);
        setAdd({title: "", url: ""});
      }

    return (
        <div className="input-container">
            
            <label>Title </label>
            <input type="text" value={add.title} onChange={(e)=> setAdd({...add, title: e.target.value})}></input>
            <br />
            <label>URL </label>
            <input type="text" value={add.url} onChange={(e)=> setAdd({...add, url: e.target.value})}></input>
            <br />
            <div className="btn-addvideo-container">
            <button onClick={() => setShowAddVideo(false)}>Cancel</button>
            <button onClick={onClickHandler}>Add</button>
            </div>
           
        </div>
    )
}

export default Addvideo
