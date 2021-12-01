import React from "react";

  let titleInput = function titleInput(titleInput) {
         return titleInput;
  }

  let urlInput = function urlInput(urlInput) {
  return urlInput;
 }

 function addVideoToList(){
    
     

 }



 
function AddVideo(props){


     addVideoToList = { titleInput, urlInput };
   

    return(
        <div className ="add-video">
            <p>Add Video</p>
            <form action="" method="submit">
            <label for="title" name="title" >Title</label>
            <input id="title" type="text" onCompositionEnd={(e)=>{titleInput(e.target.value)}} ></input>
            <label for="url" name="url">URL</label>
            <input id="url" type="text" onCompositionEnd={(e)=>{urlInput( e.target.value)}}></input>
            <button id="add-video" type ="submit" onClick={addVideoToList}> Add Video</button>
            </form>

        </div>
    )
    }

export default AddVideo;