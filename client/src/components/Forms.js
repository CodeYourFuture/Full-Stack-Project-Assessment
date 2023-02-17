import React, { useState } from "react";
import "./comp.css";
export const Forms = () => {
    const [dlt, setDlt] = useState(true)
    const displayForm = () => {
        setDlt(true);
    }

    const hideForm = (e) => {

        e.preventDefault();
        setDlt(false);
    }
    return (

        <div>
            <h2 onClick={displayForm} className="coloring">Add Video</h2>
            <form className={dlt ? "d-block" : "d-none"}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" className="form-label col-sm-3">Title</label>
                    <input type="text" className="form-control col-sm-3" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label col-sm-3">URL</label>
                    <input type="url" class="form-control col-sm-3" id="url" />
                </div>
                <div><button type="submit" className="btn btn-primary" onClick={hideForm}>Cancel</button>
                    <p> </p>
                    <button type="submit" className="btn btn-primary">Add</button> </div>

            </form>
        </div>
    )
}
