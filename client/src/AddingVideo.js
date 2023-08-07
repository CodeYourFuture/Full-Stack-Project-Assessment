import { useState } from "react"

const AddingVideo = ({ allMyVideos, setAllMyVideos }) => {
    const [title, setTitle] = useState("")
    const [url, setUrl] = useState("")

    async function handleAddButton(event) {
        event.preventDefault()
        const newVideo = {
            title, url
        }
        let res = await fetch("https://youtube-video-server.onrender.com/videos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newVideo)
        })

        if (res.ok) {
            let video = await res.json()
            video && fetch("https://youtube-video-server.onrender.com/videos")
                .then((response) => {
                    if (!response.ok) {
                        console.log(response.status)
                        setAllMyVideos(response.status)
                        throw new Error(response.status)
                    } else {
                        return response.json()
                    }

                })
                .then((data) => {
                    data && setAllMyVideos(data)
                })
        }
        setTitle("")
        setUrl("")
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