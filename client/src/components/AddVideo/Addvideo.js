import React,{useState} from 'react'
import "./Addvideo.css";

const Addvideo = ({addVideo,setShowAddVideo}) => {
    //const [add, setAdd] = useState({title: "", url: ""});
    const [values, setValues] = useState({title: "", url: "",rating:0, posted: new Date().toLocaleString()});
     
    const onClickHandler =  () =>{ 
        if(values.title === ""){
            alert("Please add a valid title")
        }else if (!matchYoutubeUrl(values.url)){
            alert("Please add a valid url")        
        }else{
            addVideo(values);
          console.log(values);
        }
    }
    
   
const matchYoutubeUrl = ((url) => {
    const p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        if (url.match(p)) {
            return url.match(p)[1];
        }
   return false;
});  

   const handelChange = (e) =>{
       setValues({
        ...values,
        [e.target.name]: e.target.value,
       })
   }


    return (
        <div className="input-container">
            
            <label>Title </label>
            {/* <input type="text" value={add.title} onChange={(e)=> setAdd({...add, title: e.target.value})}></input> */}
            <input type="text"  name="title" value={values.title} onChange={handelChange}></input>
            {/* {errors.title && <p className="errors">{errors.title}</p>} */}
            <br />
            <label>URL </label>
            {/* <input type="text" value={add.url} onChange={(e)=> setAdd({...add, url: e.target.value})}></input> */}
            <input type="text" name="url" value={values.url} onChange={handelChange}></input>
            {/* {errors.url && <p className="errors">{errors.url}</p>} */}
            <br />
            <div className="btn-addvideo-container">
            <button onClick={() => setShowAddVideo(false)}>Cancel</button>
            <button onClick={onClickHandler}>Add</button>
            </div>
           
        </div>
    )
}

export default Addvideo
