import { useState } from "react";
import  React from "react";
import ShowVideos from "./ShowVideos";
function Videos(props) {
    const[titleData,setTitleData]=useState();
    const [urlData, setUrlData] = useState();

    function cancelBtnHandler(e){
        console.log("cancell....");
      e.preventDefault();
      props.setShow(false);
    }

    function addClickHandeler(e) {
      e.preventDefault();

    }
  return (
    <>
      {props.show && (
        <form className="formDiv" onSubmit={addClickHandeler}>
          <div className="input-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              value={titleData}
              onChange={(e) => setTitleData(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="url">Url</label>
            <input
              id="url"
              value={urlData}
              onChange={(e) => setUrlData(e.target.value)}
              required
            />
          </div>
        
          <div className="addCancelBtn">
            <button onClick={cancelBtnHandler}>
              Cancel
            </button>
            <button type="submit">
              Add
            </button>
          </div>
        </form>
      )}
    </>
  );  
}
export default Videos;