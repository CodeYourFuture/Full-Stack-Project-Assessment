import React, { useState } from "react";
import Search from "./Search";

function Form(prop) {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    //const [list, setList] = useState(prop.videos);
    const submitHandler = (e) => {
        e.preventDefault();
        prop.videos.unshift({ title: title, url: url });
       // setList(list.unshift({title: title, url: url}));
    };
    return (
    <div>
          <form onSubmit={submitHandler} > 
            <div>
                <h2>Add videos</h2>
                <div className="form-group row">        
                    <label htmlFor="title" className="col-sm-2 col-form-label">Title:</label>
                    <div className="col-sm-2">
                        <input onChange={(e) => setTitle(e.target.value)} id="title" type="text" name="title"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="url" className="col-sm-2 col-form-label">URL:</label>
                    <div className="col-sm-2">
                        <input onChange={(e) => setUrl(e.target.value)} id="url" type="text" name="url"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <button className="btn-danger btn mb-4" >Cancel</button>
                    </div>
                    <div className="col-sm-4">
                        <input type="submit" className="btn-primary btn mb-4" value="Add"/>
                    </div>
                </div>
            </div>
        <Search/>
        </form>
        
    </div>
    )
}


export default Form;