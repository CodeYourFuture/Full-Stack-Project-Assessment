import React, { useState } from "react";
import SearchBox from "./SearchBox";

const VideoForm = () => {
    return (
        <div className="row">
            <form className="w-25 ml-3">
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">URL</label>
                    <input type="url" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary m-2">Submit</button>
                <button type="cancel" className="btn btn-warning m-2">Cancel</button>
            </form>
            <div className="m-5">
                <SearchBox />
            </div>
        </div>
    )
}

export default VideoForm;