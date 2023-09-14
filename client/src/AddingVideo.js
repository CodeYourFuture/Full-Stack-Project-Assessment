import { useState } from "react"

const AddingVideo = ({ setAllMyVideos }) => {
    const [title, setTitle] = useState("")
    const [url, setUrl] = useState("")

    async function handleAddButton(e) {
        e.preventDefault();
        const newVideo = {
            title,
            url
        };

        try {
            // Add the new video
            const res = await fetch("https://youtube-video-server.onrender.com/videos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newVideo)
            });

            if (!res.ok) {
                throw new Error(`Failed to add video (${res.status})`);
            }

            // Fetch the updated video list
            const response = await fetch("https://youtube-video-server.onrender.com/videos");

            if (!response.ok) {
                throw new Error(`Failed to fetch video list (${response.status})`);
            }

            const data = await response.json();
            setAllMyVideos(data);

            // Reset the input fields
            setTitle("");
            setUrl("");

        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <div className="form-holder">
            <h3>Add Your Favorite Video</h3>
            <form onSubmit={handleAddButton}>
                <input type="text" defaultValue="" placeholder="Type in the title of the video you like" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                <input tupe="url" defaultValue="" placeholder="Link for the video" value={url} onChange={(e) => setUrl(e.target.value)}></input>
                <button className="submit-form-button">Add to the List</button>
            </form>
        </div>
    )
}

export default AddingVideo