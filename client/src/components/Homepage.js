import React, { useState } from "react";
import data from "../data";
import Header from "./Header";
import SearchBar from "./SearchBar";
import AddVideoForm from "./AddVideoForm";
import List from "./List";

console.log(fetch(""));

function Homepage() {
  const [list, setList] = useState(data);
  const [filteredList, setFilteredList] = useState(data);

  //remove video button
  function handleRemove(id) {
    const newList = list.filter((item) => item.id !== id);
    console.log(newList);
    setList(newList);
    const newFilteredList = filteredList.filter((item) => item.id !== id);
    setFilteredList(newFilteredList);
  }

  function handleAddNewVideo(title, url) {
    const newItem = {
      //add random unique id
      // id,
      title,
      url,
      rating: 0,
    };
    //update list to append item (opposite of handleRemove)
  }

  function handleSearch(searchTerm) {
    const newList = list.filter((item) => item.title.includes(searchTerm));
    console.log("setting filtered list", newList);
    console.log(`search term is ${searchTerm}`);
    setFilteredList(newList);
  }

  function handleAddTitleAndUrl() {
    console.log("hi");
  }
  return (
    <div>
      {" "}
      <Header />
      <main>
        <SearchBar handleSearch={handleSearch} />
        <AddVideoForm
          handleAddTitleAndUrl={handleAddTitleAndUrl}
          handleAddNewVideo={handleAddNewVideo}
        />
        <List list={filteredList} onRemove={handleRemove} />
      </main>
    </div>
  );
}

export default Homepage;
