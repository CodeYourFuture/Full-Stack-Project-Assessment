import React, { useState, Fragment } from 'react'

const AddVideo = () => {
    const [displayAddVideo, setDisplayAddVideo] = useState(false);
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");

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

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-warning mt-3 mt-md-4 mx-3 col-3 col-md-2"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop">
                Add Video
            </button>
            <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title text-center" id="staticBackdropLabel">Add Video
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
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
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-warning"
                                data-bs-dismiss="modal"
                                onClick={() => setDisplayAddVideo(!displayAddVideo)}>Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={handleAdd}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default AddVideo;
