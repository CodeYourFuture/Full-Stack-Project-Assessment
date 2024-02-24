import { useState } from "react";

const AddingVideo = ({ setAllMyVideos }) => {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleAddButton(e) {
        e.preventDefault();
        const newVideo = {
            title,
            url,
        };

        try {
            const res = await fetch(
                "http://ec2-13-41-184-74.eu-west-2.compute.amazonaws.com/videos",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newVideo),
                }
            );

            if (!res.ok) {
                if (!newVideo.url && !newVideo.title) {
                    setErrorMessage("URL and title fields are missing");
                } else if (!newVideo.url) {
                    setErrorMessage("URL field is missing");
                } else if (!newVideo.title) {
                    setErrorMessage("Title field is missing");
                }
            } else if (res.ok) {
                setErrorMessage("");
            }

            const response = await fetch(
                "http://ec2-13-41-184-74.eu-west-2.compute.amazonaws.com/videos"
            );

            if (!response.ok) {
                throw new Error(`Failed to fetch video list (${response.status})`);
            }
            const data = await response.json();
            setAllMyVideos(data);

            setTitle("");
            setUrl("");
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <div className="form-holder">
            <h3>Add Your Favorite Video</h3>
            <p style={{ color: "red" }}>{errorMessage}</p>
            <form onSubmit={handleAddButton}>
                <input
                    type="text"
                    placeholder="Type in the title of the video you like"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="url"
                    placeholder="Link for the video"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <button className="submit-form-button">Add to the List</button>
            </form>
        </div>
    );
};

export default AddingVideo;
