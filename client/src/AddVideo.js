import React ,{useState}from "react";
import "./App.css";

const AddVideo = () => {

    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");


   

    function handelTille(event){
        console.log(event.target.value)
        return setTitle(event.target.value)
       
    };

    function handelUrl(event){
        console.log(event.target.value)
        setUrl(event.target.value)
    }
    function handelAdd(){
        if (title === "" || url === "") {
            alert("The title or url field should not be empty.")
        } else if(!url.includes("youtube") || !url.includes("watch")){
            alert("Please enter a valid Url")
        }else {
            const data = { url: url, title: title, rating: 0 };
            fetch("http://localhost:5000/videos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data1) => {
                    console.log("Success:", data1);
                })
                .catch((error) => {
                    console.log(error);
                });
            alert("Video added");
            setUrl("");
            setTitle("");
        }     
    };


    function handelCancel(){
        setTitle("")
        setUrl("")
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