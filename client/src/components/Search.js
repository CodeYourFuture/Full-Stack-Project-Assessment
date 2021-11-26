import React from 'react';

const Search = (props) => {
    return (
        <div className="navbar navbar-dark m-3 justify-content-center">
        <form className="mx-4">
          <div className="mb-3 d-flex align-items-center justify-content-center">
            <label htmlFor="title" className="col-sm-4 col-form-label col-form-label-lg">
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

export default Search;