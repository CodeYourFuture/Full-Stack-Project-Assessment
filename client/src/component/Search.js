import React from 'react';

const Search = ({search, handleSearch}) => {

    return (
        <div className="m-3 col-md-2">
            <form className="form-group m-4">
                <div className="d-flex align-items-center">
                    <label className="form-label m-2 ">Search</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        onChange={handleSearch} 
                        value={search}
                    />
                </div>
            </form>
        </div>
    )
}

export default Search;