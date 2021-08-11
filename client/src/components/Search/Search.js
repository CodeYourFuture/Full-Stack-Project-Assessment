import React from "react";
// import  "./Search.css";

const Search = ({ search, setSearch }) => {
    
    return (
        <div className="App-Search mt-1 mb-2 col-md-3">
            <form className="mx-4">
                <div className="mb-3 d-flex align-items-center justify-content-center">
                    <label
                        htmlFor="title"
                        className="form-label fst-italic mx-2" >Search
                    </label>
                    <input
                        type="text" 
                        className="form-control" /*className="search"*/ 
                        id="title"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />    
                </div>
            </form>
        </div>
    )
}

export default Search; 