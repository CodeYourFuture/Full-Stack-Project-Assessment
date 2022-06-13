import React, { useState } from "react";
import "./App.css";
import data from "./data";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import AddVideoForm from "./components/AddVideoForm";
import List from "./components/List";

function App() {
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

  function handleSearch(searchTerm) {
    const newList = list.filter((item) => item.title.includes(searchTerm));
    // console.log("setting filtered list", newList);
    // console.log(`search term is ${searchTerm}`);
    setFilteredList(newList);
  }

  function handleAddTitleAndUrl() {
    console.log("hi");
  }

  return (
    <div>
      <Header />
      <main>
        <SearchBar handleSearch={handleSearch} />
        <AddVideoForm handleAddTitleAndUrl={handleAddTitleAndUrl} />
        <List list={filteredList} onRemove={handleRemove} />
      </main>
    </div>
  );
}

export default App;
