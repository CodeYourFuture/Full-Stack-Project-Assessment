import React from "react";

const SearchVideo = ({ SearchVideo, setSearchVideo }) => {
    return (
        <div className="App-Search mt-3 offset-md-2 col-md-3">
            <form className="mx-4">
               <div className="mb-3 d-flex align-items-center justify-content-center">
                   <label htmlFor="title" className="form-label fst-italic mx-2">
                          Search Video:
                     </label>
                    <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="Enter video title"
                    onChange={(e) => setSearchVideo(e.target.value)}
                    />
                </div>
            </form>
        </div>
    );
};


export default SearchVideo;

