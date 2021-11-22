import React from "react";

const SearchInput = () => {
  return (
    <div>
      <div>
        <form>
          <label htmlFor="videoSearch">Search</label>
          <div>
            <input type="text" id="searchVideo"></input>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchInput;
