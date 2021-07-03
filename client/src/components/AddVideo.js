import React, { useState, useEffect } from 'react'

const AddVideo = ({ data, setData }) => {
    const [displayAddVideo, setDisplayAddVideo] = useState(false);
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");

    // const handleAdd = (e) => {
    //     e.preventDefault()
    //     const videoId = Math.floor(Math.random() * 100000);
    //     const newVideo = {
    //         id: videoId,
    //         title: title,
    //         url: url,
    //         rating: 0
    //     };
    //     setData(data.concat(newVideo));
    //     setTitle("");
    //     setUrl("");
    // }

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const newVideo = {
                title: title,
                url: url,
                rating: 0
            };
            await fetch("http://localhost:5000", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newVideo)
            });
        } catch (error) {
            console.error(error.message);
        }
        setTitle("");
        setUrl("");
    }

    useEffect(() => {
        fetch("https://askin-full-stack-project-db.herokuapp.com/")
          .then((res) => res.json())
          .then((data) => setData(data))
          .catch((error) => console.log(error))
      }, [url]);

    return (
        <div className="App-AddVideo my-3 col-6 col-md-3">
            <h5 onClick={() => setDisplayAddVideo(!displayAddVideo)}>Add Video</h5>
            {displayAddVideo && (
                <form className="mx-4" >
                    <div className="mb-3">
                        <label
                            htmlFor="title" className="form-label fst-italic">Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            id="title" className="form-control"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="url"
                            className="form-label fst-italic">URL
                        </label>
                        <input
                            type="text" className="form-control"
                            id="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>
                    <div className="d-flex justify-content-around">
                        <button
                            className="btn btn-warning"
                            type="button"
                            onClick={() => setDisplayAddVideo(!displayAddVideo)}
                        >Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={handleAdd}>Add
                        </button>
                    </div>
                </form>
            )
            }
        </div>
    )
}

export default AddVideo
