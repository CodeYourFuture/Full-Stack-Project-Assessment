import React ,{useState}from "react";
import "./App.css";

const AddVideo = () => {

    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");


    // const [visibility, setVisibility] = useState("addingOptionHidden");
    // const [clicked, setClicked] = useState(true);
    // const visibilityHandler = () => {
    //     setClicked(!clicked);
    //     !clicked
    //         ? (setVisibility("addingOptionHidden"))
    //         : (setVisibility("addingOptionVisible"));
    //     setTitle("");
    //     setUrl("")
    // };


    function handelTille(event){
        console.log(event.target.value)
        return setTitle(event.target.value)
       
    };

    function handelUrl(event){
        console.log(event.target.value)
        setUrl(event.target.value)
    }
    function handelAdd(){
       return console.log("Add buton")
    }
    function handelCancel(){
        return console.log("Cancel button")
    }
    
    return ( 
         <div className="add-video-wrapper">
            <h4 >Add Video</h4>
            <div className="title-flex-row">
                <label>Title</label>
                <input 
                type="text"
                value={title}
                onChange={handelTille}>
                 </input>
            </div>
            <div className="url-flex-row" >
                 <label >Url</label>
                 <input
                 type="text"
                 value={url}
                 onChange={handelUrl}>
                 </input>
            </div>
            <div className="buttons">
                <button onClick={handelAdd}>Add</button>
                <button onClick={handelCancel}> Cancel</button>

            </div>
     </div>
    
    );
}
 
export default AddVideo;