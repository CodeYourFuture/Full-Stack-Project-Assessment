import React, { useState } from 'react'

const AddVideo = () => {
    const [displayAddVideo, setDisplayAddVideo] = useState(false);

    return (
        <div className="App-AddVideo my-3 col-6 col-md-3">
            <h5 onClick={() => setDisplayAddVideo(!displayAddVideo)}>Add Video</h5>
            {displayAddVideo && (
                <form className="mx-4">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label fst-italic">Title</label>
                        <input type="text" className="form-control" id="title" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="url" className="form-label fst-italic">URL</label>
                        <input type="text" className="form-control" id="url" />
                    </div>
                    <div className="d-flex justify-content-around">
                        <button type="button" onClick={() => setDisplayAddVideo(!displayAddVideo)} className="btn btn-warning ">Cancel</button>
                        <button type="button" className="btn btn-danger">Add</button>
                    </div>
                </form>

            )
            }
        </div>
    )
}

export default AddVideo
