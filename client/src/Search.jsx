import React from "react";
import "./App.css";
import { FaSearch } from "react-icons/fa";

export default function Search(props) {
  return (
    <div className="col-md mt-3">
      <div className="search">
        <div className="search-row mb-3 search-input">
          <input
            className="form-control"
            type="text"
            placeholder=""
            value={props.searchTerm}
            onChange={(event) => props.handleSearch(event)}
          />
        </div>
        <FaSearch className="search-icon" />
      </div>
    </div>
  );
}
