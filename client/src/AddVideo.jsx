import React, { useState } from "react";

const AddVideo = ({ addVideo }) => {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = event => {
        event.preventDefault();
        if (!title || !url) {
            setErrorMessage("Please enter a Title and URL");
            return;
        }
        addVideo({ title, url });
        setTitle("");
        setUrl("");
    }

    return (
        <div className="video-adder">
            <form onSubmit={handleSubmit}>
                <label for="title">Add Title </label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label for="url">Add Url</label>
                <input
                    id="url"
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <button type="submit">Add Video</button>
            </form>
        </div>
    );

}







export default AddVideo; 