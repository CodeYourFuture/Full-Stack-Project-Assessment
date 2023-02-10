import React from "react";

const SearchBar = (props) => {
  return (
    <div className="flex items-center">
      <div className="flex border border-purple-200 rounded">
        <input
          type="search"
          className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Search..."
          onKeyUp={props.search}
        />
        <button className="px-4 text-white bg-purple-600 border-l rounded hover:bg-blue-700 ">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
