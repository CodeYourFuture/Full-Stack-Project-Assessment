import React, { useState } from "react";

function AddVideo({videosData}) {
    const [addTitle, setAddTitle] = useState("")
    // const [addUrl, setAddUrl] = useState("")

    function handleChangeTitle(e) {
        setAddTitle(e.target.value)
    }

    // function handleChangeUrl(e) {
    //     setAddUrl(e.target.value)
    // }

  return (
      <div>
          <form>
            <div className="form-group">
                <label for="exampleInputEmail1">Search Video</label>
                <input type="text" 
                placeholder="Search"
                value={addTitle}
                onChange={handleChangeTitle}/>
            </div>

            {/* <div className="form-group">
                <label for="exampleInputEmail1">Search Video</label>
                <input type="text" 
                placeholder="Search"
                value={addUrl}
                onChange={handleChangeUrl}/>
            </div> */}
           
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
      </div>
  )
}



export default AddVideo;
