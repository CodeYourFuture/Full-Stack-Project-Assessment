import React from "react";
import { useState } from "react";
import VideoList from "./VideoList";

const Search = (props) => {
  
  const [searchInput, setSearchInput] = useState("");
  

  function handleSearchInput(event) {
    const query = event.target.value.toLowerCase();
    setSearchInput(query);
    
    if (query === "") {
      props.setFilterData(props.allData);
    } else {
      const filterArray = props.allData.filter((video) =>
        video.title.toLowerCase().includes(query)
      );
      props.setFilterData(filterArray);
    }
  }
  
    return (
      <>
        <div>
          <input
            id="SearchBar"
            className=""
            placeholder="Search Video"
            value={searchInput}
            onChange={(e) => handleSearchInput(e)}
          />
          {/* <button> Click me </button> */}
        </div>
        <div>
          <VideoList filterData={props.filterData} />
        </div>
      </>
    );
  }

export default Search;
