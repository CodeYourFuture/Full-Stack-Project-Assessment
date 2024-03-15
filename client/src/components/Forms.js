import React, { useState } from "react";
import "./comp.css";
export const Forms = () => {


    // const [id, setId] = useState(Math.floor(Math.random() * 99999));
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    // const [rating, setRating] = useState(0);

    const handleSubmit = (e) => {

        e.preventDefault();

        const video = { title, url }

        fetch("http://localhost:3030/videos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            title: JSON.stringify(video),

        }).then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText)
            }
            console.log("New video added successfully")
        }).catch((err) => { console.log(err) });
    }

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
            <form className={!dlt ? "d-block" : "d-none"} onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label col-sm-3">Title</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="form-control col-sm-3" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label col-sm-3">URL</label>
                    <input value={url} onChange={(e) => setUrl(e.target.value)} type="text" className="form-control col-sm-3" id="url" />
                </div>
                <div><button type="submit" className="btn btn-primary" onClick={hideForm}>Cancel</button>
                    <p> </p>
                    <button type="submit" className="btn btn-primary">Add</button> </div>
            </form>
        </div>
    )
}
