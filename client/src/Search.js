import React from "react";

function Search() {
    return ( 
        <div>
            <div className="input-group">
                <input className="form-control col-md-8" type="search" placeholder="Search videos" />
                <div className="input-group-prepend"> 
                    <button className="btn btn-outline-secondary">Search</button>
                </div>    
            </div>
        </div>
    )
}

export default Search;