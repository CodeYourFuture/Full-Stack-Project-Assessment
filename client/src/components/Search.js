import React from "react";

export default function Search(props) {
  return (
    <div className="App-Search mt-3 offset-md-2 col-md-3">
      <form className="mx-4">
        <div className="mb-3 d-flex align-items-center justify-content-center">
          <label htmlFor="title" className="form-label fst-italic mx-2">
            Search
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            onChange={(e) => props.setSearch(e.target.value)}
            value={props.search}
          />
        </div>
      </form>
    </div>
  );
}
