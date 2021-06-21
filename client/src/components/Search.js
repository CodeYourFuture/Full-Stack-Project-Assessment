import React from "react";
import { useGlobalContext } from "../context";


const Search = () => {
    const {  searchValue, setSearchValue } = useGlobalContext();
    const searchVideos = (e) => {
        setSearchValue(e.target.value)
    }
    return (
        <div className="row m-3">
            <label htmlFor="search" className="col-sm-2 col-form-label">Search</label>
            <div className="col-md-10"> 
            <input 
            type="text" 
            className="form-control" 
            id="search" 
            placeholder="Search"
            value={searchValue}
            onChange={searchVideos}
             />
            </div>
        </div>
    )
}

export default Search;