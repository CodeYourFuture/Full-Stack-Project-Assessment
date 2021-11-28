import React from "react";

function Addbtn() {
    return (
        <div className="addbtn-wrapper">
            <h3>Add Video</h3>
            <form>
                <label>Title</label>
                <input></input>
                <br/>
                <label>Url</label>
                <input></input>
            </form>
            <button>Add</button>
        </div>
    )
}

  
export default Addbtn;