import React, { useState } from "react";
import "./comp.css";
export const Forms = () => {
    const [dlt, setDlt] = useState(true)
    const displayForm = () => {
        setDlt(false);
    }

    const hideForm = (e) => {

        e.preventDefault();
        setDlt(true);
    }
    return (

        <div className="form">
            <h2 onClick={displayForm} className="coloring">Add Video</h2>
            <form className={!dlt ? "d-block" : "d-none"}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label col-sm-3">Title</label>
                    <input type="text" className="form-control col-sm-3" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label col-sm-3">URL</label>
                    <input type="url" className="form-control col-sm-3" id="url" />
                </div>
                <div><button type="submit" className="btn btn-primary" onClick={hideForm}>Cancel</button>
                    <p> </p>
                    <button type="submit" className="btn btn-primary">Add</button> </div>
            </form>
        </div>
    )
}
