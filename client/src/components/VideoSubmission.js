import { useState } from "react";

export default ({addVideo}) => {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [changed, setChanged] = useState(false);

    const titleValid = !changed || title!=="";
    const urlValid = !changed || url.match(/youtube.com\/watch\?v=[a-zA-Z0-9-]{11}/);

    const updateField = function (e) {
        setChanged(true);

        switch (e.target.name) {
            case "title": setTitle(e.target.value); break;
            case "url": setUrl(e.target.value); break;
        }
    }

    const submitVideo = function (e) {
        e.preventDefault();

        if (changed && titleValid && urlValid) {
            addVideo(title, url);

            setChanged(false);
            setTitle("");
            setUrl("");
        }
    }

    return <div id="submit-video">
        <h2>Submit a new video</h2>
        <form aria-label="Submit a new video" onSubmit={submitVideo}>
            <label htmlFor="title">Title: </label><input type="text" name="title" id="title" value={title} onChange={updateField} className={titleValid ? "valid" : "invalid"}/>
            <label htmlFor="url">Url: </label><input type="text" name="url" id="url" value={url} onChange={updateField} className={urlValid ? "valid" : "invalid"}/>
            <button type="submit">Submit</button>
        </form>
    </div>
}
