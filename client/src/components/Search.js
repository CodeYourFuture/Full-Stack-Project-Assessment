import React from "react";
import { useGlobalContext } from "../context";
import OrderByButtons from "./OrderByButtons";

const Search = () => {
    const {  searchValue, setSearchValue } = useGlobalContext();
    const searchVideos = (e) => {
        setSearchValue(e.target.value)
    }
    return (
        <div className="d-flex">
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
        <div className="mt-3">
            <OrderByButtons className="col-md-10"/>
        </div>
        </div>
    )
}

export default Search;