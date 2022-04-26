import React, { useState } from "react";
import Search from "./Search"
function Form(prop) {

    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        prop.addVideos(title, url)
        const videoData = {
            title: title,
            url: url
        }
        fetch("http://127.0.0.1:5000/", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(videoData),
        })
        .then( async (response) => {
            if (response.status >= 200 && response.status <= 299) {
                return response.json();
            } else {
                throw new Error(await response.text());
            }
        })
        .catch((error) => console.log(error));
    };
    return (
    <div>
        <form> 
            <div>
                <h2>Add videos</h2>
                <div className="form-group row">        
                    <label htmlFor="title" className="col-sm-2 col-form-label">Title:</label>
                    <div className="col-sm-2">
                        <input onChange={(e) => setTitle(e.target.value)} id="title" type="text" name="title" value={title} />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="url" className="col-sm-2 col-form-label">URL:</label>
                    <div className="col-sm-2">
                        <input onChange={(e) => setUrl(e.target.value)} id="url" type="text" name="url" value={url}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <button className="btn-danger btn mb-4" type="reset">Cancel</button>
                    </div>
                    <div className="col-sm-4">
                        <button onClick={submitHandler} className="btn-primary btn mb-4">Add</button>
                    </div>
                </div>
            </div>
            <Search />
        </form>
        
    </div>
    )
}


export default Form;