import React from "react";
import { useState, useEffect } from "react";
import VideoList from "./VideoList";

const Search = () => {
  const [allData, setAllData] = useState([]);
 const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    fetch("https://flannel-hickory-parallelogram.glitch.me/videos")
      .then((res) => res.json())
      .then((data) => {
        setAllData(data);
        setFilterData(data)
      });
  }, []);
  const [searchInput, setSearchInput] = useState("");
  

  function handleSearchInput(event) {
    const query = event.target.value.toLowerCase();
    setSearchInput(query);
    
    if (query === "") {
      setFilterData(allData);
    } else {
      const filterArray = allData.filter((video) =>
        video.title.toLowerCase().includes(query)
      );
      setFilterData(filterArray);
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
            onChange={e=>handleSearchInput(e)}
          />
          {/* <button> Click me </button> */}
        </div>
        <div >
          <VideoList filterData={filterData} />
        </div>
      </>
    );
  }

export default Search;
